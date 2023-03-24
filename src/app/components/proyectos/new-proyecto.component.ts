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
 nameP: string;
 

  constructor(private sProyecto: ProyectoSService, private activatedRouter: ActivatedRoute, 
    private router: Router, public imageServiceLogoP: ImagenService) { }

  ngOnInit(): void {
    this.imageServiceLogoP.clearUrl();
  }

  onCreate(): void{
    this.imgP = this.imageServiceLogoP.url;
    const proyecto = new Proyecto(this.nombreP, this.descripcionP, this.imgP);
    //const id = this.activatedRouter.snapshot.params['id'];
    this.sProyecto.save(proyecto).subscribe(data=>{alert("Proyecto agregado");
    this.router.navigate(['']);
      },err =>{alert("Error al agregar proyecto");
          this.router.navigate(['']);
      })
      this.imageServiceLogoP.clearUrl();
  }

  uploadImage($event: any){
    
    const nameP = "proyecto-" + this.nameP;
    this.imageServiceLogoP.uploadImage($event, nameP)
   }

  }
