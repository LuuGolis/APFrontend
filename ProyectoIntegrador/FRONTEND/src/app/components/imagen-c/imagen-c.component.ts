import { Component, OnInit } from '@angular/core';
import { Imagen } from 'src/app/model/imagen';
import { Simagen } from 'src/app/service/Simagen';

@Component({
  selector: 'app-imagen-c',
  templateUrl: './imagen-c.component.html',
  styleUrls: ['./imagen-c.component.css']
})
export class ImagenCComponent implements OnInit {
selectedFiles?: FileList;
currentFileUpload?: Imagen;
percentage = 0;

  constructor(private sImagen: Simagen) { }

  ngOnInit(): void {
  }

  selectFile(event:any): void{
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if(file){
        this.currentFileUpload = new Imagen(file);
        this.sImagen.pushFiletoStorage(this.currentFileUpload).subscribe(
         percentage => {
            this.percentage = Math.round(percentage ? percentage: 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}
