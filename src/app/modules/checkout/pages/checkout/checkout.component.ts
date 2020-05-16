import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../core/http/user.service";
import {Product} from "../../../../shared/models/Product";
import {AuthenticationService} from "../../../../core/authentication/authentication.service";
import {Router, RouterLink} from "@angular/router";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  pro : Product[]
  map;
  finalProducts : Observable<Product[]>;

  private refreshProducts = new BehaviorSubject<Product[]>(this.pro);
  products = this.refreshProducts.asObservable();


  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {

    if (localStorage.user != undefined && localStorage.user != 'undefined') {
      let token = JSON.parse(localStorage.user).token;
      let email = JSON.parse(localStorage.user).email;
      email = JSON.parse(localStorage.user).id == undefined ? email : JSON.parse(localStorage.user).id;
      this.map = new Map();
      this.userService.getUser(email, token).subscribe(user => {
        user.checkout.forEach(item =>{
          this.map.set(item.split('-')[0],item.split('-')[1])
        })
        this.userService.getCheckout(token, email).subscribe(r =>{
          this.pro = r;
        });
        console.log()
      })






    }

  }

  plusItem(id) {
    if (localStorage.user != undefined && localStorage.user != 'undefined') {
      let token = JSON.parse(localStorage.user).token;
      let email = JSON.parse(localStorage.user).email;
      email = JSON.parse(localStorage.user).id == undefined ? email : JSON.parse(localStorage.user).id;
      this.map.set(id,parseInt(this.map.get(id))+1)
      this.userService.addToCheckout(token, email,id,+1).subscribe(r =>{
        this.userService.getCheckout(token, email).subscribe(res =>{
          this.pro = res;
        })
      },error => {
        this.userService.getCheckout(token, email).subscribe(res =>{

          this.pro = res;

        })
      });


    }
  }

  minusItem(id) {
    if (localStorage.user != undefined && localStorage.user != 'undefined') {
      let token = JSON.parse(localStorage.user).token;
      let email = JSON.parse(localStorage.user).email;
      email = JSON.parse(localStorage.user).id == undefined ? email : JSON.parse(localStorage.user).id;
      if (parseInt(this.map.get(id)) > 1) {
        this.map.set(id,parseInt(this.map.get(id))-1)
      }

      this.userService.addToCheckout(token, email,id,-1).subscribe(r =>{
        console.log(r);
        this.userService.getCheckout(token, email).subscribe(res =>{
          this.pro = res;
        })
      },error => {
        this.userService.getCheckout(token, email).subscribe(res =>{
          this.pro = res;
        })
      });


    }

  }

  deleteItem(productId) {
    if (localStorage.user != undefined && localStorage.user != 'undefined') {
      let token = JSON.parse(localStorage.user).token;
      let email = JSON.parse(localStorage.user).email;
      email = JSON.parse(localStorage.user).id == undefined ? email : JSON.parse(localStorage.user).id;


      // @ts-ignore
      this.userService.deleteCheckout(token, email,productId).subscribe(data => {
        console.log(data)

      },err =>{
        console.log('error'+err)
        this.userService.getCheckout(token, email).subscribe(res =>{
          this.pro = res;
        })
      })





    }

  }

}
