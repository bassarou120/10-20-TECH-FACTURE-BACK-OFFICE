import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Actualite} from '../models/Actualite';


@Injectable({
  providedIn: 'root'
})
export class PaysService  {

  url: string = environment.backend ;


  constructor(private http: HttpClient) { }


  getPayslite(): Observable<Object> {
    return this.http.get(`${this.url}/listPays`);
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




}