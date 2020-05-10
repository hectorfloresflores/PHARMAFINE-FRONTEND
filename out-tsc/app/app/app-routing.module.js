import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { ProductsComponent } from "./modules/products/pages/products/products.component";
import { AuthGuard } from "./core/guards/auth.guard";
const routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
export const routingComponents = [FooterComponent];
//# sourceMappingURL=app-routing.module.js.map