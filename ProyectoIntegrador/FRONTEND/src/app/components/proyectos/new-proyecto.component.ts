import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImagenService } from 'src/app/service/imagen.service';
import { ProyectoSService } from 'src/app/service/proyecto-s.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {
 nombreP: string = '';
 descripcionP: string = '';
 imgP: string = '';

  constructor(private sProyecto: ProyectoSService, private activatedRouter: ActivatedRoute, 
    private router: Router, public imagenS: ImagenService) { }

  ngOnInit(): void {
  }

  onCreate(): void{
 const proyecto = new Proyecto(this.nombreP, this.descripcionP, this.imgP);
 //const id = this.activatedRouter.snapshot.params['id'];
  //this.imgP = this.imagenS.url
 this.sProyecto.save(proyecto).subscribe(data=>{alert("Proyecto agregado");
this.router.navigate(['']);
},err =>{alert("Error al agregar proyecto");
this.router.navigate(['']);
})
  }
  uploadImage($event: any){
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyecto-" + id;
    this.imagenS.uploadImage($event, name)
   }
}
