import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.sass'],
})
export class UserRegisterComponent {
  dataUser: any = {};
  faRightFromBracket = faRightFromBracket;

  frmDatos: any = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  };

  userRequest: any = {};

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  validisChangeData(): void {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.mensaje =
      'Ahora puedes modificar tus datos. Por favor verifique que los datos sean correctos antes de guardar los cambios.';
    modalRef.componentInstance.typeMessage = 'Info';
  }

  ngOnInit(): void {
    // this.userService.isLogIn = localStorage.getItem('tokenLogin')
    //   ? true
    //   : false;
    // console.log(
    //   'dataLogin',
    //   JSON.parse(localStorage.getItem('tokenLogin')?.toString() ?? '')
    // );
    // this.dataUser = JSON.parse(
    //   localStorage.getItem('tokenLogin')?.toString() ?? ''
    // );
  }

  saveUser(): void {
    this.userRequest = {
      id: this.frmDatos.id,
      name: this.frmDatos.name,
      lastName: this.frmDatos.lastname,
      email: this.frmDatos.email,
      password: this.frmDatos.password,
      address: this.frmDatos.address,
      phone: this.frmDatos.phone,
    };

    console.log('create', this.userRequest);
    this.userService.create(this.userRequest).subscribe(
      (data) => {
        console.log('userService:', data);
        const modalRef = this.modalService.open(AlertModalComponent);
        if (data.success == true) {
          modalRef.componentInstance.mensaje = 'Tu registro fue exitoso.';
          modalRef.componentInstance.typeMessage = 'Success';

          localStorage.setItem('tokenLogin', JSON.stringify(data.data));
          this.userService.isLogIn = true;
          this.router.navigate(['/product-list']);
        } else {
          modalRef.componentInstance.mensaje =
            'Ocurrió un error al registrar tu cuenta.';
          modalRef.componentInstance.typeMessage = 'Warning';
        }
      },
      (error) => {
        const modalRef = this.modalService.open(AlertModalComponent);

        modalRef.componentInstance.mensaje =
          'Ocurrió un error al registrar tu cuenta.';
        modalRef.componentInstance.typeMessage = 'Warning';
        console.error('Error al actualizar el Usuario:', error);
      }
    );
  }
}
