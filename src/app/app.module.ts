import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { HomeComponent } from './modules/home/pages/home/home.component';
import { ProductsComponent } from './modules/products/pages/products/products.component';
import { HeaderComponent } from './core/header/header.component';
import { SigninComponent } from './core/header/signin/signin.component';
import { RegisterComponent } from './core/header/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
// This app was made it with the folder structure expose in the link below...
// https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    ProductsComponent,
    HeaderComponent,
    SigninComponent,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
