import { Injectable } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {BehaviorSubject, Observable, pipe, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserService} from "../http/user.service";

class User {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private ROOT_URL = 'https://pharmafine.herokuapp.com'
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {

  }

  private saveToken(token: string, email: string) {
    localStorage.setItem('tokenUser', token);
    localStorage.setItem('userEmail', email);

  }

  public isLoggedIn(): boolean {
      const tokenData = this.getTokenData();



      if (tokenData != null) {
        let exp = JSON.parse(atob(tokenData.split('.')[1]));

        let resp = exp.exp > Date.now() / 1000;

        return resp;
      } else {
        return false;
      }
  }

  public getTokenData() {


    if (localStorage.user != 'undefined' && localStorage.user != undefined) {
       return JSON.parse(localStorage.user).token;
    } else {
      return null;
    }
  }

  public login(username: string, password: string) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>(this.ROOT_URL+'/login', { email:username, password:password },options);

  }


  logout() {
    localStorage.removeItem('user');

  }
}
