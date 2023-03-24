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
    private router: Router, public imageServiceLogoP: ImagenService
   ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoS.detail(id).subscribe(
      data =>{
        this.proyecto = data;
      }, err =>{
        alert("Error al editar proyecto");
        this.router.navigate(['']);
      }
    )
  }
  
onUpdate(): void {
  const id = this.activatedRouter.snapshot.params['id'];
  if(this.imageServiceLogoP.url !=""){
  this.proyecto.imgP = this.imageServiceLogoP.urlImg
}
  this.proyectoS.update(id, this.proyecto).subscribe(
    data => {
      this.router.navigate(['']);
      alert("Datos actualizados correctamente");
    }, err =>{
      alert("Error el editar los datos :c");
      this.router.navigate(['']);
    }
  )
  this.imageServiceLogoP.clearUrl();
}

uploadImage($event: any){
  const id = this.activatedRouter.snapshot.params['id'];
  const name = "proyecto-" + id;
  this.imageServiceLogoP.uploadImage($event, name)
 }
 cancel(): void {

  this.imageServiceLogoP.clearUrl();
  this.router.navigate(['']);

}
}
