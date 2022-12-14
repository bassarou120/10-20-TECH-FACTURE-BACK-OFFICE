import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Competition} from '../models/competition';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  url: string = environment.backend + '/competitions';

  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  save(competition: Competition): Observable<Object> {
    return this.http.post(`${this.url}`, competition);
  }

  saveWithInmageAndFile(data:any):Observable<Object> {
    return this.http.post(`${this.url}`, data);
  }
  // Modification d'un element
  edit(data: any,id: number): Observable<Object> {
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

  // liste des Competitons
  list(): Observable<Object> {
    return this.http.get(`${this.url}`);
  }

  total_competition(): Observable<Object> {
    return this.http.get(`${this.url}/available/count`);
  }

  pending_competition(): Observable<Object> {
    return this.http.get(`${this.url}/unavailable/count`);
  }

  passed_competition(): Observable<Object> {
    return this.http.get(`${this.url}/passed/count`);
  }


  // liste des IDE par id
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/${id}`);
  }
}
