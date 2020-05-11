import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import {ProductsComponent} from "./modules/products/pages/products/products.component";
import {AuthGuard} from "./core/guards/auth.guard";



const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [FooterComponent];
