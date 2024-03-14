import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLogIn: boolean = false;
  public isAdmin: boolean = false;
  public namaUserLogIn: string = '';

  private apiUrl = 'http://localhost:9088/api/v1';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/login', credentials);
  }

  update(user: any): Observable<any> {
    return this.http.put(this.apiUrl + '/auth/update', user);
  }

  create(user: any): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/register', user);
  }

  logout(): void {
    this.isLogIn = false;
    this.isAdmin = false;
    this.namaUserLogIn = '';
    localStorage.removeItem('tokenLogin');
    localStorage.removeItem('addCart');
  }

  isLoggedIn(): boolean {
    return this.isLogIn;
  }
  isAdminLogIn(): boolean {
    return this.isAdmin;
  }

  getNamaUserLogIn(): string {
    return this.namaUserLogIn;
  }
}
