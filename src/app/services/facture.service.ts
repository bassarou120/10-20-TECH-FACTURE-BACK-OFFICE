/** @format */

import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Regulation } from "app/models/regulation";
import { Actualite } from "../models/Actualite";

@Injectable({
  providedIn: "root",
})
export class FactureService {
  url: string = environment.backend;

  constructor(private http: HttpClient) {}

  // Enregistrement d'un element
  // {
  //   headers: {'Content-Type': 'multipart/form-data'}
  // }api/clients/
  save(data: any): Observable<Object> {
    return this.http.post(`${this.url}/factures`, data);
  }

  addAllDetailFacture(data: any, id): Observable<Object> {
    return this.http.post(`${this.url}/addAllDetailFacture/${id}`, data);
  }

  list(): Observable<Object> {
    return this.http.get(`${this.url}/factures`);
  }

  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/factures/${id}`);
  }

  // Modification d'un element
  edit(data: any, id: number): Observable<Object> {
    return this.http.put(`${this.url}/factures/${id}`, data);
  }

  // Supression d'un element
  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/factures/${id}`);
  }

  getFactureEtDetailById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/getFactureEtDetailById/${id}`);
  }

  getStat(): Observable<Object> {
    return this.http.get(`${this.url}/getStatistque`);
  }
}
