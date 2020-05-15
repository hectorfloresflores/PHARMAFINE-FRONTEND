import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user;
  edited = false;
  userPic = "";
  private widget: any = null;


  constructor() { }

  ngOnInit(): void {
    if (localStorage.user != 'undefined' && localStorage.user != undefined)
      this.user = JSON.parse(localStorage.user); //para obter user local

    this.user.url = "https://res.cloudinary.com/pae2020/image/upload/v1589502064/mihgrswk3ad6aybtdbd3.jpg"; // iría user.url (directo de localStorage)

    this.widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'pae2020',
        uploadPreset: 'ubmahvyp',
        showPoweredBy: false,
        clientAllowedFormats: ["png","gif", "jpeg"],
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

          // hacer post a db aquí, user.url = result.info.secure_url; con Fetch o servicio users
        }
      }
    );
  }

  onOpenUpload($event) {
    this.widget.open();
    console.log('Widget used', $event);
  }

}

