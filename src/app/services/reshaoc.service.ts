import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Regulation } from 'app/models/regulation';
import {Actualite} from '../models/Actualite';

@Injectable({
  providedIn: 'root'
})
export class ReshaocService  {

  url: string = environment.backend ;


  constructor(private http: HttpClient) { }



  updateReshaoc(data:any,id: number): Observable<Object> {
    return this.http.put(`${this.url}/reshaoc/${id}`, data);
  }


  getReshaoc(): Observable<Object> {
    return this.http.get(`${this.url}/reshaoc`);
  }

  
}