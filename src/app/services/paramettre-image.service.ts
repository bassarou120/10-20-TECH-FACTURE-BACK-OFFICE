import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Regulation } from 'app/models/regulation';
import {Actualite} from '../models/Actualite';

@Injectable({
  providedIn: 'root'
})
export class ParamettreImageService {

  url: string = environment.backend ;


  constructor(private http: HttpClient) { }

  // Enregistrement d'un element
  // {
  //   headers: {'Content-Type': 'multipart/form-data'}
  // }
  updateOrSaveImage(data: any ): Observable<Object> {
    return this.http.post(`${this.url}/updateOrSaveImage`, data);
  }

  getAllImage( ): Observable<Object> {
    return this.http.get(`${this.url}/getAllImage`);
  }


  getSponsore(key:any): Observable<Object> {

    return this.http.get(`${this.url}/getParamettreByKey/${key}`);

  }


 updateSponsore(data:any): Observable<Object> {

    return this.http.post(`${this.url}/updatParamettreByKey`,data);

  }

  getStat(): Observable<Object> {

    return this.http.get(`${this.url}/getStatistque`);

  }

    getCotisation(): Observable<Object> {
        return this.http.get(`${this.url}/listCotisationByAdherant`);
    }




}