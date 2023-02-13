import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Complaints } from 'app/models/complaints';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  url: string = environment.backend + '/complaints';
  url_by_job = environment.backend+ '/job/';

  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  save(complaints: Complaints,id:number): Observable<Object> {
    return this.http.post(`${this.url_by_job}/${id}/complaints`, complaints);
  }
  // Modification d'un element
  edit(complaints: Complaints,id: number): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, complaints);
  }

  // change statut d'un element
  changeStatut(id: number): Observable<Object> {
    return this.http.put(`${this.url}/changestatut/${id}`,'');
  }

  // Supression d'un element'
  delete(id:number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`);
  }

  // liste des elements
  list(type?:string): Observable<Object> {
    if(type){
      if(type=='reclamation'){
        return this.http.get(`${this.url}/reclamations`);
      }
      else if(type =='plainte'){
        return this.http.get(`${this.url}/plaintes`);
      }
    }
    else{
      return this.http.get(`${this.url}`);
    }
  }

  total_complaints_all(): Observable<Object> {
    return this.http.get(`${this.url}/count`);
  }

  total_complaints(): Observable<Object> {
    return this.http.get(`${this.url}/count/plainte`);
  }

  treated_complaints(): Observable<Object> {
    return this.http.get(`${this.url}/count`);
  }

  unTreated_complaints(): Observable<Object> {
    return this.http.get(`${this.url}/count/untreated/plainte`);
  }

  total_reclamations(): Observable<Object> {
    return this.http.get(`${this.url}/count/reclamation`);
  }

  treated_reclamations(): Observable<Object> {
    return this.http.get(`${this.url}/count`);
  }

  unTreated_reclamations(): Observable<Object> {
    return this.http.get(`${this.url}/count/untreated/reclamation`);
  }

  // liste des IDE par id
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/${id}`);
  }

   // liste des IDE par id
   stat(): Observable<Object> {
    return this.http.get(`${this.url}/plaintes_reclamations_count`);
  }

}
