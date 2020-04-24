import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('AuthenticationService', () => {
  let getToken : AuthenticationService,
  httpTestingController:  HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        getToken
      ]
    });
    getToken = TestBed.get(AuthenticationService)
    httpTestingController = TestBed.get(HttpTestingController);
  });



  it('should get a token', () => {
    const dummyPost = [{
      email: "carlos.flogars@gmail.com",
      password: "1234"
    }]
    getToken.login("carlos.flogars@gmail.com","1234").subscribe(token => {
      console.log(token);
    })
  });
});
