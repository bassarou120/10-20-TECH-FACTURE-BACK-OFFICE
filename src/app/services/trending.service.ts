import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Trending } from 'app/models/trending';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  url: string = environment.backend + '/trendings';
  url_by_job = environment.backend+ '/job/';

  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  save(trending: Trending,id: number): Observable<Object> {
    return this.http.post(`${this.url_by_job}${id}/trendings`, trending);

  }

  //   Modification d'un element
  //  edit(trending: Trending,id: number): Observable<Object> {
  //   return this.http.put(`${this.url}/${id}`, trending);
  // }

   // Modification d'un element
 edit(data:any,id: number): Observable<Object> {
  return this.http.put(`${this.url}/${id}`, data);
}

  // Supression d'un element 
  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Supression d'un element 
  deleteByJob(id: number): Observable<Object> {
      return this.http.delete(`${this.url_by_job}/${id}/trendings`);
  }
  
  // liste des infos
  list(): Observable<Object> {
    return this.http.get(`${this.url}/nofilter`);
  }

  // liste des IDE par id
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/${id}`);
  }
}
