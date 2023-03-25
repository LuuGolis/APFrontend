import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImagenService } from 'src/app/service/imagen.service';
import { ProyectoSService } from 'src/app/service/proyecto-s.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {
  proyecto: Proyecto = null;


  constructor(private activatedRouter: ActivatedRoute, private proyectoS: ProyectoSService,
    private router: Router, public imageSP: ImagenService
  ) { }

  ngOnInit(): void {
    this.imageSP.clearUrl();
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoS.detail(id).subscribe(
      data => {
        this.proyecto = data;
      }, err => {
        alert("Error al editar proyecto");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    if (this.imageSP.url != "") {
      this.proyecto.imgP = this.imageSP.urlImg
    }
    this.proyectoS.update(id, this.proyecto).subscribe(
      data => {
        this.router.navigate(['']);
        alert("Datos actualizados correctamente");
      }, err => {
        alert("Error el editar los datos :c");
        this.router.navigate(['']);
      }
    )
  }

  uploadImage($event: any) {
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyecto-" + id;
    this.imageSP.uploadImage($event, name)
  }

}
