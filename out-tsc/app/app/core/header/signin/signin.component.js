import * as tslib_1 from "tslib";
import { Component, EventEmitter, ViewChild, Output } from '@angular/core';
import { Validators } from "@angular/forms";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
let SigninComponent = 
/**
 * Sign in modal; it is diferrent from register modal.
 */
class SigninComponent {
    /**
     * Create parrams of class sign in modal.
     * @param modalService for open modal sign in.
     * @param formBuilder for evaluate form sign in.
     * @param route
     * @param router
     */
    constructor(modalService, formBuilder, route, router, authenticationService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.shoeRegister = new EventEmitter();
        /*Modal SGININ*/
        this.closeResult = '';
        this.loading = false;
        this.submitted = false;
        this.returnUrl = '/';
        this.error = '';
    }
    /**
     * Open modal from parent component header.compenent.ts.
     */
    open() {
        this.modalService.open(this.signin, { ariaLabelledBy: 'title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    openRegister() {
        this.modalService.dismissAll();
        this.shoeRegister.emit('register');
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
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .subscribe(data => {
            // this.router.navigateByUrl('/home');
            window.location.reload();
        }, error => {
            console.log(error.error);
            this.error = error.error;
            this.loading = false;
        });
    }
};
tslib_1.__decorate([
    Output()
], SigninComponent.prototype, "shoeRegister", void 0);
tslib_1.__decorate([
    ViewChild('signin', { static: true })
], SigninComponent.prototype, "signin", void 0);
SigninComponent = tslib_1.__decorate([
    Component({
        selector: 'app-signin',
        templateUrl: './signin.component.html',
        styleUrls: ['./signin.component.css']
    })
    /**
     * Sign in modal; it is diferrent from register modal.
     */
], SigninComponent);
export { SigninComponent };
//# sourceMappingURL=signin.component.js.map