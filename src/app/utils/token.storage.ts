
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../models/User';

import {UserSystem} from "../models/UserSystem";


const TOKEN_KEY = 'AuthToken';
const CURRENT_USER = 'CURRENT_USER';
const ROLE_ADMIN = 'ROLE_ADMIN';

const ROLE_USER = 'ROLE_USER';

@Injectable()
export class TokenStorage {


  expirationsession: number;
  constructor() {

   this.expirationsession = new Date().getTime() + environment.expirationTime;
  }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(CURRENT_USER);
    window.sessionStorage.clear();
    // window.location.href="/login"
  }

  public saveUserRole(role: string){
    window.sessionStorage.setItem(ROLE_ADMIN,  role);
  }


  public isAdmin(): boolean {
    let isAdmin: boolean = false;
    if(this.getCurrentUserSysteem() != null && this.getCurrentUserSysteem().firstLogin == false){
      this.getCurrentUserSysteem().roles.forEach(function(value){
        if (value.name != ROLE_USER  )
        {
          isAdmin = true;
        }
      });
    }
    return isAdmin;
  }



  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getCurrentUser(): string {
    return sessionStorage.getItem(CURRENT_USER);
  }

  public getCurrentUserSysteem(): UserSystem {
    return JSON.parse(sessionStorage.getItem(CURRENT_USER));
  }

  public  saveCurrentUser(currentUser): boolean {
    window.sessionStorage.removeItem(CURRENT_USER);
    window.sessionStorage.setItem(CURRENT_USER,  currentUser);
    return true;
  }


}
