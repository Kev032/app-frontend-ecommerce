import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  { path: 'login', component: UserAuthComponent },
  { path: 'product-list', component: ProductComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'user-data', component: UserUpdateComponent },
  { path: 'admin-product', component: AdminProductComponent },
  { path: 'order-detail', component: OrderDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
