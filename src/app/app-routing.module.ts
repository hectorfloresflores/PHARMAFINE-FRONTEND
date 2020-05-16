import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import {ProductsComponent} from './modules/products/pages/products/products.component';
import {AuthGuard} from './core/guards/auth.guard';
import { AdminComponent } from './modules/admin/pages/admin/admin.component';
import { UserComponent } from './modules/user/pages/user/user.component';
import { UserChatComponent } from './modules/user/pages/user-chat/user-chat.component';
import { AdminChatComponent } from './modules/admin/pages/admin-chat/admin-chat.component';
import {CheckoutComponent} from "./modules/checkout/pages/checkout/checkout.component";




const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent/*, canActivate: [AuthGuard]*/},
  {path: 'user', component: UserComponent/* , canActivate: [AuthGuard] */},
  {path: 'user-chat', component: UserChatComponent/* , canActivate: [AuthGuard] */},
  {path: 'admin', component: AdminComponent /*, canActivate: [AuthGuard] */},
  {path: 'admin-chat', component: AdminChatComponent/* , canActivate: [AuthGuard] */},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [FooterComponent];
