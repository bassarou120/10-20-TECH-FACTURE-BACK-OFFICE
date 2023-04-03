import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperateurTouristiqueService {
  url: string = environment.backend + '/operateur_touristique';
  search_url: string = environment.backend + '/operateur_touristique/multi_critere_search';

  department_url = environment.backend + '/departement'; 
  commune_url = environment.backend + '/commune/list'

  constructor(private http: HttpClient) { }

  list(id?:number): Observable<Object> {
    if(id){
      return this.http.get(`${this.url}/getByJob/${id}`);
    }
    else{
      return this.http.get(`${this.url}/list`);

    }
  }

  list_ol_db(id?:number): Observable<Object> {
    if(id){
      return this.http.get(`${this.url}/getByJob/${id}`);
    }
    else{
      return this.http.get(`${this.url}/list`);

    }
  }
  // Get département
  get_department(): Observable<Object> {
    return this.http.get(`${this.department_url}/list`);
  }

  get_all_commune(): Observable<Object> {
    return this.http.get(`${this.commune_url}`);
  }

  get_commune(id: String): Observable<Object> {
    return this.http.get(`${this.commune_url}/${id}`);
  }

  // Enregistrement des reglementation
  multi_critere_search(data: any): Observable<Object> {
      return this.http.get(`${this.search_url}`, {params:data});
  }
}
