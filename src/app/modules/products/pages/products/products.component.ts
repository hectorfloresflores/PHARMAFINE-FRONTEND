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
  busqueda = '';
  greaterThan = 0;
  min = 0;
  max = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts("name=").subscribe(products =>{
      this.products = products;
    })
  }

  searchBy(key, productName) {

    if (key == 13 || key.keyCode == 13)
    this.productService.getProducts(`name=${productName}`).subscribe(products =>{
      this.products = products;
    })
  }

  searchByPriceRange(key, min, max) {
    if (key == 13 || key.keyCode == 13)
      this.productService.getProducts(`priceLow=${min}&priceHigh=${max}`).subscribe(products =>{
        this.products = products;
      })
  }

  searchByPriceGreaterThan(key, min) {
    if (key == 13 || key.keyCode == 13)
      this.productService.getProducts(`priceLow=${min}`).subscribe(products =>{
        this.products = products;
      })
  }
}
