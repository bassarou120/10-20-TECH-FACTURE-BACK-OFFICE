import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Actualite} from '../models/Actualite';


@Injectable({
  providedIn: 'root'
})
export class AdherantService   {

  url: string = environment.backend ;


  constructor(private http: HttpClient) { }


  getAdherantlite(): Observable<Object> {
    return this.http.get(`${this.url}/adherant`);
  }

  gethoptalByPays(id){

    return this.http.get(`${this.url}/gethoptalByPays/${id}`);
  }

  addHopital(data:any): Observable<Object> {
    return this.http.post(`${this.url}/addhopital`, data);
  }


  updateStatusPays (data:any): Observable<Object> {
    return this.http.post(`${this.url}/updateStatusPays`, data);
  }


  getCotisationByAdherant(id: number): Observable<Object> {
    return this.http.get(`${this.url}/getCotisationByAdherant/${id}`);
  }

  getCotisation(): Observable<Object> {
    return this.http.get(`${this.url}/listCotisation`);
  }






}