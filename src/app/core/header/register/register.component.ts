import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../http/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {




  /**
   * To access register modal if from register.component.html
   */
  @ViewChild('register', { static: true }) register: ElementRef;


  /*Modal SGININ*/
  closeResult = '';
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  saveUsername = false;
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
              private userService: UserService,
  ) {}

  /**
   * Open modal from parent component header.compenent.ts.
   */
  open() {

    this.modalService.open(this.register, {ariaLabelledBy: 'title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', [Validators.required, Validators.minLength(6)]],
      terms: ['',[Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

     this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    alert('valid')
    //this.userService.register(this.registerForm.value);
  }



}
