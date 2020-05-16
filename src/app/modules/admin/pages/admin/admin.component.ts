import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/http/user.service';

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

    // iría user.url (directo de localStorage)

    this.widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'pae2020',
        uploadPreset: 'ubmahvyp',
        showPoweredBy: false,
        //clientAllowedFormats: ["png", "gif", "jpeg", "jpg"],
        theme: 'minimal',
        cropping: true,
        croppingAspectRatio: 1.0,
        croppingDefaultSelectionRatio: 1.0
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Subida a cloud! nuevo URL: ', result.info.secure_url);
          this.userPic = result.info.secure_url;
          this.edited = true;

          // hacer patch a db aquí, user.url = result.info.secure_url;
          console.log("user: " + this.user.email + " nuevo URL: " + result.info.secure_url + " token: " + this.user.token);
          //localStorage.setItem(user.url, result.info.secure_url);
          //localStorage.user.url = "aaaaaa";

          this.userService.updateURL(this.user.email, this.user.token, result.info.secure_url).subscribe(user => {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
            console.log("url updated local + db!");

          })
          console.log("url updated !!"); //funciona hasta aquí...
          //vovler a hacer get para actualizar user en localStorage con datos nuevos de db
          this.userService.getUser(this.user.email, this.user.token).subscribe(user => {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
            console.log("Nuevos user obtenido!");
            //listo
          })

        }
      }
    );
  }

  onOpenUpload($event) {
    this.widget.open();
    console.log('Widget used', $event);
  }

}
