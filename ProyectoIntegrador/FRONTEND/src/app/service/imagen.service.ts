import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
 URL = 'http://localhost:8090/image';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.URL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  //Cambios el 30/9 codigo original en componentes/imagen

  getFiles(imageUrl: string): Observable<Blob>{
    return this.http.get(imageUrl, {responseType: 'blob'});
  }
}
