import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',


  })
};

@Injectable()
export class AuthService {

  authUrl = environment.backend  ;
  //currentUserUrl = environment.backend + '/user/me';


  constructor(private  http: HttpClient)  {
  }

  attemptAuth(usernameOrEmail: string, password: string): Observable<any> {
    const credentials = {email: usernameOrEmail, password: password};
    console.log('attempAuth ::');
    return this.http.post(`${this.authUrl}/login`, credentials,httpOptions );
  }

  retrieveCurrentUser() {
    return this.http.get(`${this.authUrl}/me`);
  }

  resetAccount(email: string) {
    return this.http.post(`${this.authUrl}/check-email`, email);
  }

}
