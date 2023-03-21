import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Faq} from '../models/faq';
import {Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  url: string = environment.backend + '/faq';
  url_by_job = environment.backend+ '/job/';

  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  save(faq: Faq,id: number): Observable<Object> {
    return this.http.post(`${this.url_by_job}${id}/faq`, faq);
  }

  // Modification d'un element
  edit(faq: Faq,id: number): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, faq);
  }


  // hide d'un element
  hide(id: number): Observable<Object> {
    return this.http.put(`${this.url}/hide/${id}`,'');
  }

  // save(faq: Faq): Observable<Object> {
  //   return this.http.post(`${this.url}`, faq);
  // }

  // Supression d'un element faq
  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`);
  }

  // liste des FAq
  list(): Observable<Object> {
    return this.http.get(`${this.url}/nofilter`);
  }

  // liste des IDE par id
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/${id}`);
  }
}
