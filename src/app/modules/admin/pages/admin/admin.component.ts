import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/http/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user;
  edited = false;
  userPic = "";
  private widget: any = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.user != 'undefined' && localStorage.user != undefined)
      this.user = JSON.parse(localStorage.user); //para obter user local

    this.user.url = "https://res.cloudinary.com/pae2020/image/upload/v1589507446/users/vb5flhdhty3dyicoj68m.png"; // iría user.url (directo de localStorage)

    this.widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'pae2020',
        uploadPreset: 'ubmahvyp',
        showPoweredBy: false,
        clientAllowedFormats: ["png", "gif", "jpeg"],
        theme: 'minimal',
        cropping: true,
        croppingAspectRatio: 1.0,
        croppingDefaultSelectionRatio: 1.0
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Subida! secure url: ', result.info.secure_url);
          this.userPic = result.info.secure_url;
          this.edited = true;

          console.log(this.user.email, result.info.secure_url, this.user.token);
          this.userService.update(this.user.email, result.info.secure_url, this.user.token).subscribe(user =>{
            localStorage.setItem('userUpdated',JSON.stringify(user));
            console.log("user updated!");
          })
          // hacer post a db aquí, user.url = result.info.secure_url;
          /* ###
          PATCH http://localhost:5000/users
          Content - Type: application / json
          x - auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcmxvcy5mbG9nYXJzQGdtYWlsLmNvbSIsImlhdCI6MTU4OTU2MDg3MCwiZXhwIjoxNTg5NTY0NDcwfQ.aMOmIT91fXBr4YhgvXQCfjPUJxSxaSDre - w43nVx9X4
          email: 108831227522248479954

          {
            "url": "www"
          } */

          
        }
      }
    );
  }

  onOpenUpload($event) {
    this.widget.open();
    console.log('Widget used', $event);
  }

}
