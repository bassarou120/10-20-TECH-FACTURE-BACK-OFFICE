import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  url: string = environment.backend + '/jobs';
  url1: string = environment.backend + '/eservice_demande';

  constructor(private http: HttpClient) { }

    // liste des FAq
    list(): Observable<Object> {
      return this.http.get(`${this.url}`);
    }
  
    stat_by_demande_job(): Observable<Object> {
      return this.http.get(`${this.url1}/getStatistiqueByMetier`);
    }

    getStatByDate(data:any): Observable<Object> {
  
      return this.http.get(`${this.url1}/getStatistique`,{params:data});
    }
}
