import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../shared/models/Product";
import {User} from "../../shared/models/User";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ROOT_URL = 'https://pharmafine.herokuapp.com'
  constructor(private http: HttpClient) { }

  getProducts(query) {
    return this.http.get<Product[]>( this.ROOT_URL+`/products?${query}`);
  }

  createProduct(body, email: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'email': email,
        'x-auth': token
      })
    };


    console.log(body, options)
    console.log("updated user (through user.service)")
    return this.http.post<Product>(this.ROOT_URL + '/products', body, options);
  }

}
