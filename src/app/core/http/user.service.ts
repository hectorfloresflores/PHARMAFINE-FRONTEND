import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "../../shared/models/User";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({ providedIn: 'root' })
export class UserService {
  private ROOT_URL = 'https://pharmafine.herokuapp.com'


  constructor(private http: HttpClient) { }

  getUser(email: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
          'email':email,
        'x-auth': token})
    }

    console.log(options)
    return this.http.get<User>(this.ROOT_URL + '/users',options);
  }

  register(user: User) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post(this.ROOT_URL +`/users`, user, options);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
