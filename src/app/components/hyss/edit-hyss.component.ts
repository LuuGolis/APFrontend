import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mhyss } from 'src/app/model/Mhyss';
import { ShyssService } from 'src/app/service/shyss.service';

@Component({
  selector: 'app-edit-hyss',
  templateUrl: './edit-hyss.component.html',
  styleUrls: ['./edit-hyss.component.css']
})
export class EditHyssComponent implements OnInit {
skill: Mhyss = null;
  constructor(private hyssS: ShyssService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.hyssS.detail(id).subscribe(data =>{
      this.skill = data;
    }, err =>{
      alert("Error al modificar");
      this.router.navigate(['']);
    })
  }

  onUpdate(){
    const id = this.activatedRouter.snapshot.params['id'];
    this.hyssS.update(id, this.skill).subscribe( data =>{
      this.router.navigate(['']);
    }, err => {
      alert("Error al actualizar habilidad");
      this.router.navigate(['']);
    })
  }

}
