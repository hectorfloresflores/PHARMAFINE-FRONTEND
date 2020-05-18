import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/http/user.service';
import { ProductService } from '../../../../core/http/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  user;
  imageUpdated = false;
  productPic = "";
  private widget: any = null;

  newProductTest = { name: "", lastname: "" }; //objeto a usar para nuevo producto
  newProduct = {
    name: "",
    description: "",
    price: 0,
    image: "",
    id: "",
    stock: 0
  };

  constructor(private userService: UserService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.newProduct);
    if (localStorage.user != 'undefined' && localStorage.user != undefined)
      this.user = JSON.parse(localStorage.user); //para obter user local

    //this.newProduct.name = this.user.name;
    //this.newProduct.lastname = this.user.lastname;

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
          console.log('Subida a cloud! nuevo URL de product: ', result.info.secure_url);
          this.newProduct.image = result.info.secure_url;
          this.imageUpdated = true;

          // hacer patch a db aquí, user.url = result.info.secure_url;
          console.log("user: " + this.user.email + " nuevo URL: " + result.info.secure_url + " token: " + this.user.token);
          //localStorage.setItem(user.url, result.info.secure_url);
          //localStorage.user.url = "aaaaaa";

          /* this.userService.updateURL(this.user.email, this.user.token, result.info.secure_url).subscribe(user => {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
            console.log("url updated local + db!");

          }) */
          /* console.log("url updated !!"); //funciona hasta aquí...
          //vovler a hacer get para actualizar user en localStorage con datos nuevos de db
          this.userService.getUser(this.user.email, this.user.token).subscribe(user => {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
            console.log("Nuevo url obtenido!");
            //listo
          }) */

        }
      }
    );
  }

  onOpenUpload($event) {
    this.widget.open();
    console.log('Widget used', $event);
  }

  submitProduct(): void {
    //mandarlo a función nueva de servicio productos

    /* this.productService.newProduct(this.newProduct, this.user.email, this.user.token).subscribe(user => {

    }); */
  }

  createProduct() {
    //   let newProduct = {
    //     name: "prueba 1",
    //     description: "prueba 1",
    //     precio: 700,
    //     image: "https://picsum.photos/id/15/300/300",
    //     id: "0005",
    //     stock: 10
    //   }
    this.productService.createProduct(this.newProduct, this.user.email, this.user.token)
      .subscribe(result => {
        alert('created')
        console.log("Producto creado!");

      }, error => {
        this.router.navigateByUrl("/products");

      })


  }

}
