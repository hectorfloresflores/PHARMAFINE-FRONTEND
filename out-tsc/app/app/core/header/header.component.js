import * as tslib_1 from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import { SigninComponent } from "./signin/signin.component";
import { RegisterComponent } from "./register/register.component";
let HeaderComponent = class HeaderComponent {
    constructor() {
        this.HeaderBackgroundColor = false;
        this.IsToggleNav = false;
    }
    openSignIn() {
        this.childModalSignIn.open();
    }
    openRegister() {
        this.registerComponent.open();
    }
    /**
     * For coloring black when scroll down.
      * @param $event
     */
    onScrollEvent($event) {
        if (window.pageYOffset > 100) {
            this.HeaderBackgroundColor = true;
        }
        else {
            this.HeaderBackgroundColor = false;
        }
    }
    /**
     * Toggle Navgation var.
     */
    toggleNav() {
        this.IsToggleNav = !this.IsToggleNav;
    }
};
tslib_1.__decorate([
    ViewChild(SigninComponent, { static: true })
], HeaderComponent.prototype, "childModalSignIn", void 0);
tslib_1.__decorate([
    ViewChild(RegisterComponent, { static: true })
], HeaderComponent.prototype, "registerComponent", void 0);
tslib_1.__decorate([
    HostListener('window:scroll', ['$event'])
], HeaderComponent.prototype, "onScrollEvent", null);
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map