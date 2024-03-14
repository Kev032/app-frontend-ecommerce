import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';

import {
  faRightFromBracket,
  faImage,
  faEdit,
  faRemove,
  faSave,
  faSearch,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import { ProductService } from '../service/product.service';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.sass'],
})
export class AdminProductComponent {
  user: any = {};
  products: any[] = [];

  faImage = faImage;
  faEdit = faEdit;
  faRemove = faRemove;
  faSave = faSave;
  faSearch = faSearch;
  faPlus = faPlus;
  faRightFromBracket = faRightFromBracket;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userService.isLogIn = localStorage.getItem('tokenLogin')
      ? true
      : false;
    if (this.userService.isLogIn) {
      this.user = JSON.parse(
        localStorage.getItem('tokenLogin')?.toString() ?? ''
      );
      console.log('user', this.user);
    }
    if (this.user.type == 'Comprador') {
      this.userService.isAdmin = false;
    } else {
      this.userService.isAdmin = true;
    }
    this.getAllProducts();
  }

  getAllProducts(): any {
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

  openViewImageModal(product: any): void {
    const modalRef = this.modalService.open(ViewProductComponent, {
      centered: true,
    });
    this.productService.setProductsSelected(product);
    modalRef.componentInstance.name = 'ModalViewProductComponent';
  }
  openEditModal(product: any): void {
    const modalRef = this.modalService.open(EditProductComponent, {
      centered: true,
    });
    this.productService.setProductsSelected(product);
    modalRef.componentInstance.name = 'ModalEditProductComponent';
  }
  openAddModal(): void {
    const modalRef = this.modalService.open(AddProductComponent, {
      centered: true,
    });
    modalRef.componentInstance.name = 'ModalAddProductComponent';
  }

  deleteProduct(product: any): void {
    const modalRef = this.modalService.open(AlertModalComponent);

    this.productService.deleteProduct(product.id).subscribe(
      (data) => {
        console.log('Product deleted:', data);
        modalRef.componentInstance.name = 'modalDeleteProduct';
        modalRef.componentInstance.mensaje =
          'Producto eliminado correctamente.';
        modalRef.componentInstance.typeMessage = 'Success';
        this.getAllProducts();
      },
      (error) => {
        modalRef.componentInstance.name = 'modalDeleteProduct';
        modalRef.componentInstance.mensaje =
          'Ocurrió un error al eliminar el Producto.';
        modalRef.componentInstance.typeMessage = 'Warning';
        console.error('Error al eliminar el Producto:', error);
      }
    );
  }
}
