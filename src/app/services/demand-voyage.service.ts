import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DemandVoyageService {

  url: string = environment.backend + '/eservice_demande';
  constructor(private http: HttpClient) { }

  // liste des Accord
  list(): Observable<Object> {
    return this.http.get(`${this.url}`);
  }

  listByUser(omtId:string): Observable<Object> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("omt_id",omtId);
    return this.http.get(`${this.url}/getDemandeByOmtId`,{
      params:queryParams
    });
  }

  listByJob(job:string): Observable<Object> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("code",job);
    return this.http.get(`${this.url}/getDemandeByMetier`,{
      params:queryParams
    });
  }
 
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/getDemandeyId/${id}`);
  }

  accept(id: number): Observable<Object> {
    return this.http.get(`${this.url}/accepte/${id}`);
  }

  denied(id: number): Observable<Object> {
    return this.http.get(`${this.url}/denied/${id}`);
  }
}
