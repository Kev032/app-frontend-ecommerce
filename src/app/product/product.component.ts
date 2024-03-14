import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';
// import { faCoffee, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  dataLogin: any;
  faShopify = faShopify;
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('token', localStorage.getItem('tokenLogin'));
    this.userService.isLogIn = localStorage.getItem('tokenLogin')
      ? true
      : false;
    console.log('dataLogin', this.dataLogin);
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('Products:', data);
        this.products = data.data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addCart(product: any): void {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.name = 'modalAddCart';
    modalRef.componentInstance.mensaje =
      'Se agregó el Producto a tu bolsa de compras.';
    modalRef.componentInstance.typeMessage = 'Info';
    this.productService.addProductToCart(product);
  }

  gotoCart(): void {
    console.log('gotoCart');
  }
}
