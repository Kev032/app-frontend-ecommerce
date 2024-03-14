import { Component } from '@angular/core';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.sass'],
})
export class UserAuthComponent {
  faRightToBracket = faRightToBracket;
  showSpinner: boolean = false;
  credentials: any = {
    email: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  loginUser(): void {
    this.userService.login(this.credentials).subscribe(
      (data) => {
        const modalRef = this.modalService.open(AlertModalComponent);
        if (data.success == true) {
          modalRef.componentInstance.mensaje =
            'Bienvenido otra vez, aprovecha las promociones que tenemos para ti.';
          modalRef.componentInstance.typeMessage = 'Success';

          this.userService.isLogIn = true;
          console.log('User is logged in:', data);
          this.modalService.dismissAll('loginModal');
          data.data.password = '';
          localStorage.setItem('tokenLogin', JSON.stringify(data.data));
          if (data.data.type == 'Administrador') {
            this.userService.isAdmin = true;
          }
        } else {
          this.userService.isLogIn = false;
          modalRef.componentInstance.mensaje =
            'No hemos reconocido tu cuenta, puedes volver a intentar.';
          modalRef.componentInstance.typeMessage = 'Warning';
        }
        this.userService.namaUserLogIn =
          data.data.name + ' ' + data.data.lastName;
        this.router.navigateByUrl('/product-list');
      },
      (error) => {
        const modalRef = this.modalService.open(AlertModalComponent);
        modalRef.componentInstance.mensaje =
          'No hemos reconocido tu cuenta, puedes volver a intentar.';
        modalRef.componentInstance.typeMessage = 'Warning';
        console.error('Error fetching products:', error);
      }
    );
  }

  gotoRegisterUser() {
    this.modalService.dismissAll('loginModal');
    this.router.navigate(['/user-register']);
  }
}
