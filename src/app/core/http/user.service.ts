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

  update(email: string, token: string, newUrl: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'email': email,
        'x-auth': token
      })
    };

    const body = {
      url: newUrl
    }

    console.log(options)
    return this.http.patch<User>(this.ROOT_URL + '/users', body, options);
  }

  /* ###
          PATCH http://localhost:5000/users
          Content - Type: application / json
          x - auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcmxvcy5mbG9nYXJzQGdtYWlsLmNvbSIsImlhdCI6MTU4OTU2MDg3MCwiZXhwIjoxNTg5NTY0NDcwfQ.aMOmIT91fXBr4YhgvXQCfjPUJxSxaSDre - w43nVx9X4
          email: 108831227522248479954

          {
            "url": "www"
          } */
}
