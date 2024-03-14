import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserRegisterComponent } from './user-register/user-register.component';

import { ProductService } from './service/product.service';
import { UserService } from './service/user.service';
import { OrdersService } from './service/orders.service';
import { FooterComponent } from './footer/footer.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { EditProductComponent } from './admin-product/edit-product/edit-product.component';
import { AddProductComponent } from './admin-product/add-product/add-product.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { ViewProductComponent } from './admin-product/view-product/view-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    ShoppingCartComponent,
    UserAuthComponent,
    UserRegisterComponent,
    FooterComponent,
    UserUpdateComponent,
    AlertModalComponent,
    OrderDetailComponent,
    EditProductComponent,
    AddProductComponent,
    ViewProductComponent,

    AdminProductComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ProductService, UserService, OrdersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
