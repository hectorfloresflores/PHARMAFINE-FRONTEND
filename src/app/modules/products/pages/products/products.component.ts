import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../../core/http/product.service";
import {Product} from "../../../../shared/models/Product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts("").subscribe(products =>{
      this.products = products;
    })
  }
}
