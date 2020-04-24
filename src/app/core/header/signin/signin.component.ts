import {Component, OnInit, EventEmitter, ViewChild, ElementRef, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../authentication/authentication.service";


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
              private authenticationService: AuthenticationService
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

          // this.router.navigateByUrl('/home');
          window.location.reload();
        },
        error => {
          console.log(error.error)
          this.error = error.error;
          this.loading = false;
        });
  }


}
