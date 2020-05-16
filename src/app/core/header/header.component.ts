import {Component, HostListener, ViewChild, OnInit} from '@angular/core';
import {SigninComponent} from "./signin/signin.component";
import {RegisterComponent} from "./register/register.component";
import { User } from 'src/app/shared/models/User';
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit{
  user;
  navSize = "0px"
  ngOnInit(): void {
    if (localStorage.user != 'undefined' && localStorage.user != undefined)
    this.user = JSON.parse(localStorage.user); //para obter user local
  }
  @ViewChild(SigninComponent,{static: true} ) childModalSignIn: SigninComponent ;
  @ViewChild(RegisterComponent,{static: true} ) registerComponent: RegisterComponent ;




  openSignIn() {
    this.childModalSignIn.open();
  }

  openRegister() {
    this.registerComponent.open();
  }


  HeaderBackgroundColor = false;
  IsToggleNav = false;


  constructor(private router: Router) {}

  /**
   * For coloring black when scroll down.
    * @param $event
   */
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    if (window.pageYOffset >= 100) {
      this.HeaderBackgroundColor = true;
    }else{
      this.HeaderBackgroundColor = false;
    }
  }

  /**
   * Toggle Navgation var.
   */
  openNav() {
    this.navSize = "250px";
  }

  closeNav() {
    this.navSize = "0px";

  }



}
