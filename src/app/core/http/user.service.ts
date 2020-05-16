import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { User } from "../../shared/models/User";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { stringify } from 'querystring';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Injectable({ providedIn: 'root' })
export class UserService {
  private ROOT_URL = 'https://pharmafine.herokuapp.com'


  constructor(private http: HttpClient) { }

  getUser(email: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'email': email,
        'x-auth': token
      })
    }

    console.log(options)
    return this.http.get<User>(this.ROOT_URL + '/users', options);
  }

  register(user: User) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post(this.ROOT_URL + `/users`, user, options);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  updateURL(email: string, token: string, newUrl: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'email': email,
        'x-auth': token
      })
    };

    const body = { 
      "url": newUrl 
    };

    console.log(body, options)
    console.log("updated url (through user.service)")
    return this.http.patch(this.ROOT_URL + '/users', body, options);
  }

  updateUser(name: string, lastname: string, email: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'email': email,
        'x-auth': token
      })
    };

    const body = {
      "name": name,
      "lastname": lastname /*,
      "password": password ,
      'url': '',
      'date': '',
      'genre': '',
      'checkout': '',
      'role': '' */
    }

    console.log(body, options)
    console.log("updated user (through user.service)")
    return this.http.patch<User>(this.ROOT_URL + '/users', body, options);
  }

}
