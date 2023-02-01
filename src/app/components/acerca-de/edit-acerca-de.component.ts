import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImagenService } from 'src/app/service/imagen.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent implements OnInit {
  persona: Persona = null;
  constructor(private activatedRouter: ActivatedRoute, private personaS: PersonaService, 
    private router: Router,
    public imagenS: ImagenService ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaS.detail(id).subscribe(
      data =>{
        this.persona = data;
      }, err =>{
        alert("Error al editar experiencia");
        this.router.navigate(['']);
      }
    )
  }
onUpdate(): void {
  const id = this.activatedRouter.snapshot.params['id'];
  this.persona.img = this.imagenS.url
  this.personaS.update(id, this.persona).subscribe(
    data => {
      this.router.navigate(['']);
      alert("Datos actualizados correctamente");
    }, err =>{
      alert("Error el editar los datos :c");
      this.router.navigate(['']);
    }
  )
}

uploadImage($event: any){
 const id = this.activatedRouter.snapshot.params['id'];
 const name = "perfil-" + id;
 this.imagenS.uploadImage($event, name)
}
}