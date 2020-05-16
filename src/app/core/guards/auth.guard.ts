import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../authentication/authentication.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
       this.router.navigateByUrl('home');
      return false;
    }
    return true;


  }

}
