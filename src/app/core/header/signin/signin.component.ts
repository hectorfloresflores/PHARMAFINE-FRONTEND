import {Component, OnInit, EventEmitter, ViewChild, ElementRef, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../authentication/authentication.service";
import {User} from "../../../shared/models/User";
import {UserService} from "../../http/user.service";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

/**
 * Sign in modal; it is diferrent from register modal.
 */
export class SigninComponent implements OnInit {


  @Output()
  shoeRegister = new EventEmitter<string>();
  /**
   * To read sign if from sign.component.html.
   */
  @ViewChild('signin', { static: true }) signin: ElementRef;


  /*Modal SGININ*/
  closeResult = '';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/';
  error = '';
  loggedIn = false;
  title = '';
  user;

  /**
   * Create parrams of class sign in modal.
   * @param modalService for open modal sign in.
   * @param formBuilder for evaluate form sign in.
   * @param route
   * @param router
   */
  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService
  ) {}

  /**
   * Open modal from parent component header.compenent.ts.
   */
  open() {

    this.modalService.open(this.signin, {ariaLabelledBy: 'title'}).result.then((result) => {
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
  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (localStorage.user != 'undefined' && localStorage.user != undefined) {

       this.loggedIn = this.authenticationService.isLoggedIn();

      if(this.loggedIn) {
        this.user = JSON.parse(localStorage.getItem('user'));

      }
    }
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
      .subscribe(
        data => {
          this.userService.getUser(this.f.username.value, data.token).subscribe(user =>{
            localStorage.setItem('user',JSON.stringify(user));
            this.router.navigateByUrl('/home');
            window.location.reload();
          })
        },
        error => {
          console.log(error.error)
          this.error = error.error;
          this.loading = false;
        });
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/home');
    window.location.reload();
  }

  googleAuth() {

    window.location.href = 'https://pharmafine.herokuapp.com/auth/google/login';
  }


}
