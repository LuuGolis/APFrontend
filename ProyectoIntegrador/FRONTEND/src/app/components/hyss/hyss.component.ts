import { Component, OnInit } from '@angular/core';
import { Mhyss } from 'src/app/model/Mhyss';
import { ShyssService } from 'src/app/service/shyss.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hyss',
  templateUrl: './hyss.component.html',
  styleUrls: ['./hyss.component.css']
})
export class HyssComponent implements OnInit {
 skill: Mhyss[] = [];
 

  constructor(private hyssS: ShyssService, private tokenService: TokenService) { }
 isLogged= false;

  ngOnInit(): void {
    this.cargarSkill();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

 
 
cargarSkill(): void{
    this.hyssS.lista().subscribe(
      data => {
        this.skill = data;
      }
    )
  }

  deleteSkill( id: number){
    if(id != undefined){
      this.hyssS.delete(id).subscribe(
        data => {
          this.cargarSkill();
        }, err => {
          alert("Error al borrar habilidad");
        }
      )
    }
  }


}
