import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Regulation } from 'app/models/regulation';
import {Actualite} from '../models/Actualite';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url: string = environment.backend ;


  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  // {
  //   headers: {'Content-Type': 'multipart/form-data'}
  // }api/clients/
  save(data:any ): Observable<Object> {
    return this.http.post(`${this.url}/clients`, data);
  }

  listclient():Observable<Object> {
    return this.http.get(`${this.url}/clients` );
  }

  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/clients/${id}`);
  }

  // Modification d'un element
  edit(data:any,id: number): Observable<Object> {
    return this.http.put(`${this.url}/clients/${id}`, data );
  }

  // Supression d'un element
  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/clients/${id}`);
  }










//   updateIsVedete(data:any): Observable<Object> {
//     return this.http.post(`${this.url}/updateIsVedete`, data);
//   }
//
//   saveWithInmage(data:any,id: number):Observable<Object> {
//     return this.http.post(`${this.url}/actualites`, data);
//   }
//
//
//   saveDocument(data:any):Observable<Object> {
//     return this.http.post(`${this.url}/saveDocument`, data);
//   }
//
//
//
// // hide d'un element
//   hide(id: number): Observable<Object> {
//     return this.http.put(`${this.url}/hide/${id}`,'');
//   }
//
//
//   // Supression d'un element
//   deleteByJob(id: number): Observable<Object> {
//     return this.http.delete(`${this.url}/${id}/reglementations`);
//   }
//
//   // liste des infos
//   list(): Observable<Object> {
//     return this.http.get(`${this.url}/nofilter`);
//   }
//
//   // liste des infos
//   total_reglementation(): Observable<Object> {
//     return this.http.get(`${this.url}/count`);
//   }
//
//   // liste des IDE par id
//
//   // liste des IDE par id
//   getByType(type: any): Observable<Object> {
//     return this.http.get(`${this.url}/getActuByType?type=${type}`);
//   }
//
//
//   getListEvent(): Observable<Object> {
//     return this.http.get(`${this.url}/getListeEvent`);
//   }
//
//   getReservationByEvent(id: number): Observable<Object> {
//     return this.http.get(`${this.url}/getReservationByEvent/${id}`);
//   }


}