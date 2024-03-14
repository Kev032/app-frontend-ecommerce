import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { OrdersService } from '../service/orders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.sass'],
})
export class OrderDetailComponent {
  user: any = {};
  orders: any[] = [];
  orderDetail: any[] = [];
  orderSelected: string = '';
  isCliente: boolean = false;

  faCircleInfo = faCircleInfo;

  constructor(
    private userService: UserService,
    private orderService: OrdersService,
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
      this.isCliente = true;
      this.getOrdersByClient();
    } else {
      this.isCliente = false;
      this.getAllOrders();
    }
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.mensaje =
      'Aquí puedes ver todas las Ordenes que tienes.';
    modalRef.componentInstance.typeMessage = 'Info';
  }

  @ViewChild('elementoParaDesplazarse') elementoParaDesplazarse!: ElementRef;

  scrollHaciaAbajo() {
    this.elementoParaDesplazarse.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

  gotoOrderDetail(orderId: string, detail: any): void {
    this.orderSelected = orderId;
    this.orderDetail = detail;
    this.scrollHaciaAbajo();
  }
  getOrdersByClient(): void {
    this.orderService.getOrdersByUser(this.user.id).subscribe(
      (data) => {
        console.log('Products:', data);
        this.orders = data.data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getAllOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        console.log('Products:', data);
        this.orders = data.data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
