import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../../core/http/product.service";
import {Product} from "../../../../shared/models/Product";
import {UserService} from "../../../../core/http/user.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() product: Product;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  addProduct(productId) {
    if (localStorage.user != undefined && localStorage.user != 'undefined') {
      let token = JSON.parse(localStorage.user).token;
      let email = JSON.parse(localStorage.user).email;


       this.userService.addToCheckout(token, email, productId, 1)
         .subscribe(r =>{
           alert(r)
         })

    } else {
      alert('no');
    }

  }

}
