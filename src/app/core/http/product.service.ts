import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../shared/models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(name) {
    return this.http.get<Product[]>( `http://localhost:5000/products?name=${name}`);
  }
}
