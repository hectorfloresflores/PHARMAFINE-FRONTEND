import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../shared/models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ROOT_URL = 'https://pharmafine.herokuapp.com'
  constructor(private http: HttpClient) { }

  getProducts(query) {
    return this.http.get<Product[]>( this.ROOT_URL+`/products?${query}`);
  }


}
