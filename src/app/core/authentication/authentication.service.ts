import { Injectable } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {BehaviorSubject, Observable, pipe, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  token = '';
  private ROOT_URL = 'https://pharmafine.herokuapp.com'

  constructor(private http: HttpClient) {

  }

  private saveToken(token: string) {
    localStorage.setItem('tokenUser', token);
    this.token = token;
  }

  public isLoggedIn(): boolean {
      const tokenData = this.getTokenData();
      console.log(tokenData);

      if (tokenData) {
        let resp = tokenData.exp > Date.now() / 1000;
        return resp;
      } else {
        return false;
      }
  }

  public getTokenData() {
    let payload;

    if (this.token) {
      payload = this.token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public login(username: string, password: string) {

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    }
    return this.http.post<any>(this.ROOT_URL+'/login', { email:username,password: password },options)
      .pipe(map(result => {
        this.saveToken(result.token);

      }));

  }
}
