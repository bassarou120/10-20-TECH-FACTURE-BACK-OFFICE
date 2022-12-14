import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Infos } from 'app/models/infos';

@Injectable({
  providedIn: 'root'
})
export class InfosService {

  url: string = environment.backend + '/infos';
  url_by_job = environment.backend+ '/job/';

  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  save(info: Infos,id: number): Observable<Object> {
    return this.http.post(`${this.url_by_job}${id}/infos`, info);
  }

     // Modification d'un element
     edit(data: any,id: number): Observable<Object> {
      return this.http.put(`${this.url}/${id}`, data);
    }
    
  // Supression d'un element faq
  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`);
  }

  // liste des infos
  list(): Observable<Object> {
    return this.http.get(`${this.url}`);
  }

  // liste des IDE par id
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/${id}`);
  }
}
