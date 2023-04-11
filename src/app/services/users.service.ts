import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Users } from 'app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = environment.backend + '/users';
  url_by_job = environment.backend+ '/job/';

  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  save(user: Users): Observable<Object> {
    return this.http.post(`${this.url}`, user);
  }

  updateBackofficeUser(data,id:number): Observable<Object> {
    return this.http.post(`${this.url}/updateBackofficeUser/${id}`, data);
  }

  // Supression d'un element
  delete(user: Users): Observable<Object> {
    return this.http.delete(`${this.url}`, user);
  }

  // liste des users
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }


  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/get-by-id/${id}`);
  }
}
