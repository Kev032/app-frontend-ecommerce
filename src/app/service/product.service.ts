import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsToCart: any[] = [];
  private productsSelected: any = {};

  private apiUrl = 'http://localhost:9088/api/v1';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl + '/product/list');
  }

  getProductById(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/product/' + id);
  }

  createProduct(product: FormData): Observable<any> {
    return this.http.post(this.apiUrl + '/product/create', product);
  }

  updateProduct(product: FormData): Observable<any> {
    return this.http.put(this.apiUrl + '/product/update', product);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + '/product/delete/' + id);
  }

  getProductsSelected(): any {
    return this.productsSelected;
  }

  setProductsSelected(products: any): void {
    this.productsSelected = products;
  }

  setProductsToCart(products: any[]): void {
    this.productsToCart = products;
  }

  getProductsToCart(): any[] {
    const isArrayProduct: any = JSON.parse(
      localStorage.getItem('addCart')?.toString() ?? '[]'
    );
    return isArrayProduct === '[]' ? [] : isArrayProduct;
  }

  deleteProductsToCart(id: number): void {
    const idVistos = new Set<number>();
    const isDuplicate = this.productsToCart.find((producto) => {
      return idVistos.has(producto.id);
    });

    if (isDuplicate) {
      this.productsToCart = this.eliminarPrimerDuplicado(this.productsToCart);
    } else {
      const indice = this.productsToCart.findIndex(
        (producto) => producto.id === id
      );
      if (indice !== -1) {
        this.productsToCart.splice(indice, 1); // Elimina el producto por su índice
      }
    }

    console.log('this.productsToCart', this.productsToCart);
    localStorage.setItem('addCart', JSON.stringify(this.productsToCart));
  }

  addProductToCart(product: any): void {
    this.productsToCart =
      JSON.parse(localStorage.getItem('addCart')?.toString() ?? '[]') == '[]'
        ? []
        : JSON.parse(localStorage.getItem('addCart')?.toString() ?? '[]');
    this.productsToCart.push(product);
    localStorage.setItem('addCart', JSON.stringify(this.productsToCart));
  }

  eliminarPrimerDuplicado(arrayList: any[]) {
    const idVistos = new Set<number>();

    for (let i = 0; i < arrayList.length; i++) {
      const producto = arrayList[i];

      if (idVistos.has(producto.id)) {
        arrayList.splice(i, 1); // Elimina el elemento duplicado
        return arrayList; // Retorna la lista actualizada
      } else {
        idVistos.add(producto.id);
      }
    }

    return arrayList;
  }
}
