import {Component, HostListener, ViewChild} from '@angular/core';
import {SigninComponent} from "./signin/signin.component";
import {RegisterComponent} from "./register/register.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent{
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


  constructor() {}

  /**
   * For coloring black when scroll down.
    * @param $event
   */
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    if (window.pageYOffset > 100) {
      this.HeaderBackgroundColor = true;
    }else{
      this.HeaderBackgroundColor = false;
    }
  }

  /**
   * Toggle Navgation var.
   */
  toggleNav() {
      this.IsToggleNav = !this.IsToggleNav;
  }



}
