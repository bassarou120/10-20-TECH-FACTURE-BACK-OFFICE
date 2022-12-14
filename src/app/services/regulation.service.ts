import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Regulation } from 'app/models/regulation';

@Injectable({
  providedIn: 'root'
})
export class RegulationService {

  url: string = environment.backend + '/reglementations';
  url_by_job = environment.backend+ '/job/';

  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  // {
  //   headers: {'Content-Type': 'multipart/form-data'}
  // }
  save(reg: Regulation,id: number): Observable<Object> {
    return this.http.post(`${this.url_by_job}${id}/reglementations`, reg);
  }

  saveWithInmageAndFile(data:any,id: number):Observable<Object> {
    return this.http.post(`${this.url_by_job}${id}/reglementations`, data);
  }

  // Modification d'un element
  edit(data:any,id: number): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, data);
  }


// hide d'un element
  hide(id: number): Observable<Object> {
    return this.http.put(`${this.url}/hide/${id}`,'');
  }

  // Supression d'un element 
  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Supression d'un element 
  deleteByJob(id: number): Observable<Object> {
    return this.http.delete(`${this.url_by_job}/${id}/reglementations`);
  }

  // liste des infos
  list(): Observable<Object> {
    return this.http.get(`${this.url}/nofilter`);
  }

  // liste des infos
  total_reglementation(): Observable<Object> {
    return this.http.get(`${this.url}/count`);
  }

  // liste des IDE par id
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/${id}`);
  }

}