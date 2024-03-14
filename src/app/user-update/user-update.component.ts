import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.sass'],
})
export class UserUpdateComponent {
  chkChangeData: boolean = false;
  inputEnabled: boolean = true;
  dataUser: any = {};

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
    private modalService: NgbModal
  ) {}

  validisChangeData(): void {
    this.inputEnabled = this.chkChangeData;

    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.mensaje =
      'Ahora puedes modificar tus datos. Por favor verifique que los datos sean correctos antes de guardar los cambios.';
    modalRef.componentInstance.typeMessage = 'Info';
  }

  ngOnInit(): void {
    this.userService.isLogIn = localStorage.getItem('tokenLogin')
      ? true
      : false;
    console.log(
      'dataLogin',
      JSON.parse(localStorage.getItem('tokenLogin')?.toString() ?? '')
    );
    this.dataUser = JSON.parse(
      localStorage.getItem('tokenLogin')?.toString() ?? ''
    );
    this.frmDatos.id = this.dataUser.id;
    this.frmDatos.name = this.dataUser.name;
    this.frmDatos.lastname = this.dataUser.lastName;
    this.frmDatos.email = this.dataUser.email;
    this.frmDatos.password = this.dataUser.password;
    this.frmDatos.address = this.dataUser.address;
    this.frmDatos.phone = this.dataUser.phone;
  }

  updateUser(): void {
    this.userRequest = {
      id: this.frmDatos.id,
      name: this.frmDatos.name,
      lastName: this.frmDatos.lastname,
      email: this.frmDatos.email,
      password: this.frmDatos.password,
      address: this.frmDatos.address,
      phone: this.frmDatos.phone,
    };

    console.log('updateUser', this.userRequest);
    this.userService.update(this.userRequest).subscribe(
      (data) => {
        console.log('updateUser:', data);
        const modalRef = this.modalService.open(AlertModalComponent);
        if (data.success == true) {
          modalRef.componentInstance.mensaje =
            'El usuario ha sido actualizado correctamente.';
          modalRef.componentInstance.typeMessage = 'Success';

          localStorage.setItem('tokenLogin', JSON.stringify(data.data));
        } else {
          modalRef.componentInstance.mensaje =
            'El usuario no ha sido actualizado.';
          modalRef.componentInstance.typeMessage = 'Warning';
        }
      },
      (error) => {
        console.error('Error al actualizar el Usuario:', error);
      }
    );
  }
}
