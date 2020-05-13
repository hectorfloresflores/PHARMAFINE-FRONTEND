import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../../core/http/product.service";
import {Product} from "../../../../shared/models/Product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
