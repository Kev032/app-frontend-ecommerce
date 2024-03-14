import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.sass'],
})
export class ViewProductComponent {
  productSelected: any;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productSelected = this.productService.getProductsSelected();
  }
}
