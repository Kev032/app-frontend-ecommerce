import { Component } from '@angular/core';
import { faCoffee, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { UserAuthComponent } from '../user-auth/user-auth.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  faCoffee = faCoffee;
  faShop = faShop;
  faUser = faUser;
  faShopify = faShopify;

  isAdmin: boolean = false;
  nameUser: string = '';
  user: any = {};

  constructor(
    private modalService: NgbModal,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nameUser = '';
    this.userService.isLogIn = localStorage.getItem('tokenLogin')
      ? true
      : false;

    if (this.userService.isLogIn) {
      this.user = JSON.parse(
        localStorage.getItem('tokenLogin')?.toString() ?? ''
      );
      console.log('user', this.user);
      if (this.user.type == 'Administrador') {
        this.userService.isAdmin = true;
      }
      this.userService.namaUserLogIn =
        this.user.name + ' ' + this.user.lastName;
    } else {
      this.userService.namaUserLogIn = '';
    }
  }

  openLoginModal(): void {
    const modalRef = this.modalService.open(UserAuthComponent, {
      centered: true,
    });
    modalRef.componentInstance.name = 'modalLogin';
  }
  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/product-list');
  }

  gotoUpdateDataUser(): void {
    this.router.navigateByUrl('/user-data');
  }

  gotoOrderDetail(): void {
    this.router.navigateByUrl('/order-detail');
  }

  gotoProducts(): void {
    this.router.navigateByUrl('/admin-product');
  }

  gotoCart(): void {
    this.router.navigateByUrl('/shopping-cart');
  }
}
