import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { finalize, Observable } from "rxjs";
import { Imagen } from "../model/imagen";

@Injectable({
    providedIn: 'root'
})

export class Simagen {
    private basePath = '/uploads';
    

    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

    pushFiletoStorage(imagen: Imagen): Observable<number | undefined> {
        const filePath = `${this.basePath}/${imagen.file.name}}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, imagen.file);

        uploadTask.snapshotChanges().pipe(
            finalize(() => {
                storageRef.getDownloadURL().subscribe(downloadUrl => {
                    imagen.url = downloadUrl;
                    imagen.name = imagen.file.name;
                    this.saveFileData(imagen);
                });
            })
        ).subscribe();
        return uploadTask.percentageChanges();
    }
 
    

    private saveFileData(imagen: Imagen): void {
        this.db.list(this.basePath).push(imagen);
    }

    getFiles(numberItems: number): AngularFireList<Imagen> {
        return this.db.list(this.basePath, ref =>
            ref.limitToLast(numberItems));
            
    }

    deleteFile(imagen: Imagen): void{
        this.deleteFileDatabase(imagen.key)
        .then(() => {
            this.deleteFileStorage(imagen.name);
        }) 
        .catch(error => console.log(error));
    }
    
    
    private deleteFileDatabase(key: string): Promise<void> {
        return this.db.list(this.basePath).remove(key);
    }

    private deleteFileStorage(name: string): void{
        const storageRef = this.storage.ref(this.basePath);
        storageRef.child(name).delete();
    }

}
