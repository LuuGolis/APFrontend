import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShyssService } from 'src/app/service/shyss.service';
import { Mhyss } from 'src/app/model/Mhyss';



@Component({
  selector: 'app-new-hyss',
  templateUrl: './new-hyss.component.html',
  styleUrls: ['./new-hyss.component.css']
})
export class NewHyssComponent implements OnInit {
  nombre: string;
  porcentaje: number;

  constructor(private hyssS: ShyssService, private router: Router ) { }

  ngOnInit(): void {
  }
  onCreate(): void {
    const skill = new Mhyss(this.nombre, this.porcentaje);
  this.hyssS.save(skill).subscribe(
    data => {
      alert("Habilidad creada");
      this.router.navigate(['']);
    }, err => {
      alert("Error al añadir habilidad");
      this.router.navigate(['']);
    }
  )}

}
