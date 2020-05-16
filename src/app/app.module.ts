import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { HomeComponent } from './modules/home/pages/home/home.component';
import { ProductsComponent } from './modules/products/pages/products/products.component';
import { HeaderComponent } from './core/header/header.component';
import { SigninComponent } from './core/header/signin/signin.component';
import { RegisterComponent } from './core/header/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './core/authentication/authentication.service';
import { UserComponent } from './modules/user/pages/user/user.component';
import { AdminComponent } from './modules/admin/pages/admin/admin.component';
import { UserChatComponent } from './modules/user/pages/user-chat/user-chat.component';
import { AdminChatComponent } from './modules/admin/pages/admin-chat/admin-chat.component';
import { environment } from 'src/environments/environment.prod';





import { CheckoutComponent } from './modules/checkout/pages/checkout/checkout.component';
import { CheckoutListComponent } from './modules/checkout/components/checkout-list/checkout-list.component';

import { ProductListComponent } from './modules/products/components/product-list/product-list.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
// This app was made it with the folder structure expose in the link below...
// https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7
const config: SocketIoConfig = { url: environment.url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    ProductsComponent,
    HeaderComponent,
    SigninComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    UserChatComponent,
    AdminChatComponent,
    ProductListComponent,
    CheckoutComponent,
    CheckoutListComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    CloudinaryModule.forRoot(Cloudinary, {
      cloud_name: 'pae2020',
      api_key: '865312224523489',
      api_secret: 'teTUMLdTOvYgC0rCGZOGkfbuppg'
    })

  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]

})
export class AppModule { }
