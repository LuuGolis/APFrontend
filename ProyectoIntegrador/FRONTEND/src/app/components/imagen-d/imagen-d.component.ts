import { Component, Input, OnInit } from '@angular/core';
import { Imagen } from 'src/app/model/imagen';
import { Simagen } from 'src/app/service/Simagen';

@Component({
  selector: 'app-imagen-d',
  templateUrl: './imagen-d.component.html',
  styleUrls: ['./imagen-d.component.css']
})
export class ImagenDComponent implements OnInit {
  @Input() imagen!: Imagen;

  constructor(private sImagen: Simagen) { }

  ngOnInit(): void {
  }

  deleteImagen(imagen: Imagen): void {
    this.sImagen.deleteFile(imagen);
  }

}
