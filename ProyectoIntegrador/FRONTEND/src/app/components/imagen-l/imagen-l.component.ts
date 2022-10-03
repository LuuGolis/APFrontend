import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Simagen } from 'src/app/service/Simagen';

@Component({
  selector: 'app-imagen-l',
  templateUrl: './imagen-l.component.html',
  styleUrls: ['./imagen-l.component.css']
})
export class ImagenLComponent implements OnInit {
  fileUploads?: any[];
  constructor(private sImagen: Simagen) { }

  ngOnInit(): void {
    this.sImagen.getFiles(6).snapshotChanges().pipe(
      map(changes => 
        //aca supuestamente va una key pero cual? inventada o sera la dde firebase?
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });

  }

}
