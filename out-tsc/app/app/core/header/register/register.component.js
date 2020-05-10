import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators } from "@angular/forms";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
let RegisterComponent = class RegisterComponent {
    /**
     * Create parrams of class sign in modal.
     * @param modalService for open modal sign in.
     * @param formBuilder for evaluate form sign in.
     * @param route
     * @param router
     */
    constructor(modalService, formBuilder, route, router) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        /*Modal SGININ*/
        this.closeResult = '';
        this.loading = false;
        this.submitted = false;
        this.error = '';
    }
    /**
     * Open modal from parent component header.compenent.ts.
     */
    open() {
        this.modalService.open(this.register, { ariaLabelledBy: 'title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    /**
     * Know how the modal was closed by the user.
     * @param reason
     */
    getDismissReason(reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return `with: ${reason}`;
        }
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //   .pipe(first())
        //   .subscribe(
        //     data => {
        //       this.router.navigate([this.returnUrl]);
        //     },
        //     error => {
        //       this.error = error;
        //       this.loading = false;
        //     });
    }
};
tslib_1.__decorate([
    ViewChild('register', { static: true })
], RegisterComponent.prototype, "register", void 0);
RegisterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map