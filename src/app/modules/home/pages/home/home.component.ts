import { Component, OnInit, HostListener } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params =>{


      if (params.user != undefined && params.user != 'undefined') {
        console.log(JSON.stringify(params.user));
        localStorage.setItem('user', params.user)


        this.router.navigate(['home'])
          .then(() => {
            window.location.reload();
          });
      }
    })
  }

}
