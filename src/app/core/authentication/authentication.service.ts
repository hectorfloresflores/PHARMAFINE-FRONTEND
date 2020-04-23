import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  token = '';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
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
    return this.http.post<any>(`/login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        console.log(user);
        return user;
      }));
  }
}
