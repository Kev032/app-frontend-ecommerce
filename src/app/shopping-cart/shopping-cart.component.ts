import { Component } from '@angular/core';
import { map, filter, find, reduce } from 'rxjs/operators';
import { ProductService } from '../service/product.service';
import { DecimalPipe } from '@angular/common';
import { UserService } from '../service/user.service';
import { OrdersService } from '../service/orders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';

import {
  faCcVisa,
  faCcDinersClub,
  faCcApplePay,
  faCcPaypal,
} from '@fortawesome/free-brands-svg-icons';

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass'],
})
export class ShoppingCartComponent {
  faCcVisa = faCcVisa;
  faCcDinersClub = faCcDinersClub;
  faCcApplePay = faCcApplePay;
  faCcPaypal = faCcPaypal;
  faRightFromBracket = faRightFromBracket;
  user: any = {};
  listProducts: Producto[] = [];
  quantity: number = 0;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private ordersService: OrdersService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listProducts = [];
    this.quantity = 0;
    this.userService.isLogIn = localStorage.getItem('tokenLogin')
      ? true
      : false;

    if (this.userService.isLogIn) {
      this.user = JSON.parse(
        localStorage.getItem('tokenLogin')?.toString() ?? ''
      );
      console.log('user', this.user);
    }
    this.listProducts = this.getProductsToCart();
  }

  getProductsToCart(): any {
    let productosSinDuplicados: Producto[] = [];
    let productosInit: Producto[] = [];

    console.log(
      'Productos del carrito Memory',
      this.productService.getProductsToCart()
    );
    if (this.productService.getProductsToCart().length == 0) {
      productosInit =
        JSON.parse(localStorage.getItem('addCart')?.toString() ?? '[]') == '[]'
          ? []
          : JSON.parse(localStorage.getItem('addCart')?.toString() ?? '[]');
    } else {
      productosInit = this.productService.getProductsToCart();
    }

    console.log('productosInit', productosInit);
    this.quantity = productosInit.length;
    for (const producto of productosInit) {
      const existe = productosSinDuplicados.some((p) => p.id === producto.id);
      if (!existe) {
        productosSinDuplicados.push({ ...producto });
      }
    }
    productosSinDuplicados = productosSinDuplicados.map((producto) => {
      return {
        ...producto,
        num:
          this.obtenerCantidadDuplicados(producto.id) == 0
            ? 1
            : this.obtenerCantidadDuplicados(producto.id),
      };
    });

    console.log('productosSinDuplicados', productosSinDuplicados);
    return productosSinDuplicados;
  }

  obtenerCantidadDuplicados(id: number): number {
    return this.productService
      .getProductsToCart()
      .filter((producto: Producto) => producto.id === id).length;
  }

  getTotalPrice(): number {
    return this.productService
      .getProductsToCart()
      .reduce((acc, p) => acc + p.price, 0);
  }

  getTotalQuantity(): number {
    let productosIn: Producto[] = [];
    productosIn = JSON.parse(
      localStorage.getItem('addCart')?.toString() ?? '[]'
    );
    return this.productService.getProductsToCart().length + productosIn.length;
  }

  subtractQuantityProduct(id: number): void {
    this.productService.deleteProductsToCart(id);
    this.ngOnInit();
  }

  addQuantityProduct(product: any): void {
    this.productService.addProductToCart(product);
    this.ngOnInit();
  }

  generedOrder(): void {
    if (!this.userService.isLogIn) {
      const modalRef = this.modalService.open(AlertModalComponent);
      modalRef.componentInstance.name = 'modalCartShopping';
      modalRef.componentInstance.mensaje =
        'Primero debes Ingresar a tu cuenta.';
      modalRef.componentInstance.typeMessage = 'Warning';
    } else {
      if (this.getTotalQuantity() == 0) {
        const modalRef = this.modalService.open(AlertModalComponent);
        modalRef.componentInstance.name = 'modalCartShopping';
        modalRef.componentInstance.mensaje =
          'No hay productos en tu bolsa de compras.';
        modalRef.componentInstance.typeMessage = 'Warning';
        return;
      } else {
        const orderRequest: any = {
          total: this.getTotalPrice(),
          user: {
            id: 1,
          },
          orderDetails: [
            {
              description: '',
              quantity: 0,
              price: 0,
              total: 0,
            },
          ],
        };
        orderRequest.orderDetails = [];
        for (const product of this.listProducts) {
          orderRequest.orderDetails.push({
            description: product.description,
            quantity: product.num,
            price: product.price,
            total: Number(product.num) * Number(product.price),
          });
        }

        orderRequest.total = this.getTotalPrice();
        orderRequest.user.id = this.user.id;

        console.log('orderRequest', orderRequest);
        this.ordersService.registrarOrden(orderRequest).subscribe(
          (data) => {
            console.log('Orden registrada', data);
            const modalRef = this.modalService.open(AlertModalComponent);
            modalRef.componentInstance.name = 'modalCartShopping';
            modalRef.componentInstance.mensaje =
              'Se registró tu Pedido con éxito.';
            modalRef.componentInstance.typeMessage = 'Success';
            localStorage.setItem('addCart', JSON.stringify('[]'));
            this.listProducts = [];
            setTimeout(() => {
              this.router.navigateByUrl('/product-list');
            }, 1000);
          },
          (error) => {
            console.error('Error registrando orden', error);
            const modalRef = this.modalService.open(AlertModalComponent);
            modalRef.componentInstance.name = 'modalCartShopping';
            modalRef.componentInstance.mensaje =
              'Ocurrió un error al registrar tu Pedido.';
            modalRef.componentInstance.typeMessage = 'Warning';
          }
        );
      }
    }
  }
}

interface Producto {
  id: number;
  name: string;
  price: DecimalPipe;
  description: string;
  quantity: number;
  image: Blob;
  num: number;
}
