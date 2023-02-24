import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../model/proyecto';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage'
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProyectoSService {
  URL = 'https://beglap.onrender.com/';
  
  urlimg: string = "";
 

  constructor(private httpClient: HttpClient,  private storage: Storage, private activatedRouter: ActivatedRoute) { }

  public lista(): Observable<Proyecto[]>{
   return this.httpClient.get<Proyecto[]>(this.URL + 'lista'); 
  }
  
  public detail(id:number): Observable<Proyecto>{
    return this.httpClient.get<Proyecto>(this.URL + `detail/${id}`);
    }
  
   
  
    public update(id: number, proyecto: Proyecto): Observable<any>{
      return this.httpClient.put<any>(this.URL + `update/${id}`, proyecto);
    }
  
    public delete(id: number):Observable<any>{
      return this.httpClient.delete<any>(this.URL + `delete/${id}`);
    }
     public save(proyecto: Proyecto): Observable<any>{
      return this.httpClient.post<any>(this.URL + 'create', proyecto);
    }

    public uploadImageP($event: any, nameP:string){
      //captura img y guarda en array
      const fileP = $event.target.files[0]
      //carpeta img en firebase storage
      const imgRefP = ref(this.storage, `proyecto/`+ nameP)
      uploadBytes(imgRefP, fileP).then(response => {this.getImageP()}).catch(error => console.log(error))
  
    }
  
    getImageP(){
      
      const imageRefP = ref(this.storage, 'proyecto')
     
      list(imageRefP).then(async response => {
        for(let item of response.items){
          
          this.urlimg = await getDownloadURL(item);
          console.log("la url es:" + this.urlimg);
      }
      }).catch(error => console.log(error))
    }

}
