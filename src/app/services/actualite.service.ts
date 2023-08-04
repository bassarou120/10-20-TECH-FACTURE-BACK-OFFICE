import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Regulation } from 'app/models/regulation';
import {Actualite} from '../models/Actualite';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  url: string = environment.backend ;
  url_by_job = environment.backend+ '/job/';

  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  // {
  //   headers: {'Content-Type': 'multipart/form-data'}
  // }
  save(actualite: Actualite ): Observable<Object> {
    return this.http.post(`${this.url}/actualites`, actualite);
  }

  saveWithInmage(data:any,id: number):Observable<Object> {
    return this.http.post(`${this.url}/actualites`, data);
  }

  // Modification d'un element
    edit(data:any,id: number): Observable<Object> {

    return this.http.post(`${this.url}/actualites/${id}`, data );
  }


// hide d'un element
  hide(id: number): Observable<Object> {
    return this.http.put(`${this.url}/hide/${id}`,'');
  }

  // Supression d'un element 
  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/actualites/${id}`);
  }

  // Supression d'un element 
  deleteByJob(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}/reglementations`);
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
    return this.http.get(`${this.url}/actualites/${id}`);
  }

  // liste des IDE par id
  getByType(type: any): Observable<Object> {
    return this.http.get(`${this.url}/getActuByType?type=${type}`);
  }


}