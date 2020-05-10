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

  constructor(private http: HttpClient,
              private userService: UserService) {

  }

  private saveToken(token: string, email: string) {
    localStorage.setItem('tokenUser', token);
    localStorage.setItem('userEmail', email);

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

    if (localStorage.getItem('tokenUser') == undefined) {
      payload = localStorage.getItem('tokenUser').split('.')[1];
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
        // this.saveToken(result.token,username);

        this.userService.getUser(username, result.token).subscribe(user =>{
          localStorage.setItem('user', JSON.stringify(user));
          console.log(user);
        })

      }));

  }

  logout() {
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('userEmail');
  }
}
