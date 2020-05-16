import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "../../shared/models/User";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Product} from "../../shared/models/Product";


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

  addToCheckout(token: string, email: string, productId: number, quantity: number) {
    let body = {product:productId,quantity: quantity};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth' : token,
        'email' : email
      })
    }
    return this.http.patch(this.ROOT_URL+'/checkout',body,options);

  }

  getCheckout(token: string, email: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth' : token,
        'email' : email
      })
    }
    return this.http.get<Product[]>(this.ROOT_URL+'/checkout',options);
  }

  deleteCheckout(token: string, email: string, productId) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth' : token,
        'email' : email,
        'product': productId
      })
    }
    return this.http.delete(this.ROOT_URL+'/checkout',options);
  }


}
