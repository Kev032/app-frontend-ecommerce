import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'http://localhost:9088/api/v1';

  constructor(private http: HttpClient) {}

  registrarOrden(orden: any): Observable<any> {
    return this.http.post(this.apiUrl + '/orders/create', orden);
  }

  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl + '/orders/list');
  }

  getOrdersByUser(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/orders/client/' + id);
  }

  getOrdersById(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/orders/' + id);
  }

  getOrderDeail(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/orders/detail' + id);
  }
}
