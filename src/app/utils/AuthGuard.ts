import {Inject, Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenStorage} from './token.storage';
import {environment} from '../../environments/environment';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private tokenStorage: TokenStorage) { }

  ssoUrlCallback: string = environment.ssoUrlCallback;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenStorage.getToken() !== null) {
      // logged in so return true
      return true;
    }

    // console.log("sdsadsa");
    window.location.href="https://pprodofficial.service-public.bj/official/login?client_id=mtcalicence&redirect_uri="+this.ssoUrlCallback+"&response_type=code&scope=openid&authError=true";

      // this.router.navigateByUrl("https://pprodofficial.service-public.bj/official/login?client_id=mtcalicence&redirect_uri="+this.ssoUrl+"&response_type=code&scope=openid&authError=true")

    // not logged in so redirect to login page with the return url
   // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
