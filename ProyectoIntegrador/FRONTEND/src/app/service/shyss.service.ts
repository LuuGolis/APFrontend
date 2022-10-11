import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Mhyss } from '../model/Mhyss';

@Injectable({
  providedIn: 'root'
})
export class ShyssService {
  URL = 'http://localhost:8090/hyss/';

  constructor(private httpClient: HttpClient) { }
//Hyss es array vacío xq hay + de 1 skill
  public lista(): Observable<Mhyss[]>{
    return this.httpClient.get<Mhyss[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Mhyss>{
    return this.httpClient.get<Mhyss>(this.URL + `detail/${id}`);
  }

  public save(hyss: Mhyss): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', hyss);

  }

  public update( id:number, hyss: Mhyss): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, hyss);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(this.URL + `delete/${id}`);
  }
}
