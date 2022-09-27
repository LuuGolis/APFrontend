import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagenService } from '../service/imagen.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  imageInfos?: Observable<any>;

  constructor(private imagenS: ImagenService) { }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file){
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void{
    this.progress = 0;

    if (this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
        
      if(file){
        this.currentFile = file;

        this.imagenS.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress){
              this.progress = Math.round((100*event.loaded) / event.total);
            } else if(event instanceof HttpResponse){
              this.message = event.body.message;
              this.imageInfos = this.imagenS.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message){
              this.message = err.error.message;
            }else{
              this.message = 'No se pudo subir la imagen :c';
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }
  ngOnInit(): void {
    this.imageInfos = this.imagenS.getFiles();
  }

}
