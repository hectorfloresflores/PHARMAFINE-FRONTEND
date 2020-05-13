import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.user != 'undefined' && localStorage.user != undefined)
    this.user = JSON.parse(localStorage.user); //para obter user local
  }

}

