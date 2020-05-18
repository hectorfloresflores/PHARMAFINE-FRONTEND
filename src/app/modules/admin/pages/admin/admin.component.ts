import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/http/user.service';
import {ProductService} from "../../../../core/http/product.service";

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

  editUser = { name: "", lastname: "" }; //objeto a usar cuando se edita admin

  constructor(private userService: UserService,
              private productsService: ProductService) { }

  ngOnInit(): void {
    if (localStorage.user != 'undefined' && localStorage.user != undefined)
      this.user = JSON.parse(localStorage.user); //para obter user local

    this.editUser.name = this.user.name;
    this.editUser.lastname = this.user.lastname;

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
            console.log("Nuevo url obtenido!");
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

  submitEdit() {
    this.userService.updateUser(this.editUser.name, this.editUser.lastname, this.user.email, this.user.token).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.reload();
      console.log("user updated local + db!");

    })
    console.log("user updated !!");
    //vovler a hacer get para actualizar user en localStorage con datos nuevos de db
    this.userService.getUser(this.user.email, this.user.token).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.reload();
      console.log("Nuevo user obtenido!");
      //listo
    })
  }


  // createProduct() {
  //   let newProduct = {
  //     name: "prueba 1",
  //     description: "prueba 1",
  //     precio: 700,
  //     image: "https://picsum.photos/id/15/300/300",
  //     id: "0005",
  //     stock: 10
  //   }
  //   this.productsService.createProduct(newProduct,this.user.email, this.user.token)
  //     .subscribe(result =>{
  //       alert('created')
  //     })
  // }

}
