import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

import {
  faRightFromBracket,
  faImage,
  faSave,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass'],
})
export class AddProductComponent {
  faImage = faImage;
  faSave = faSave;
  faPlus = faPlus;
  faRightFromBracket = faRightFromBracket;

  formulario: FormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    image: new FormControl(),
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private productService: ProductService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  cargarImagen(event: any) {
    const archivoSeleccionado = event.target.files[0];
    console.log('archivoSeleccionado', archivoSeleccionado);
    if (archivoSeleccionado) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formulario.get('image')?.setValue(archivoSeleccionado);
      };
      reader.readAsDataURL(archivoSeleccionado);
    }
  }

  saveProduct() {
    if (this.formulario?.valid) {
      const productData = new FormData();
      const product = {
        name: this.formulario.get('name')?.value,
        description: this.formulario.get('description')?.value,
        price: this.formulario.get('price')?.value,
        quantity: this.formulario.get('quantity')?.value,
      };

      console.log('product', this.formulario.get('image')?.value);
      productData.append('product', JSON.stringify(product));
      productData.append('image', this.formulario.get('image')?.value);

      console.log('productData', productData);
      this.productService.createProduct(productData).subscribe(
        (data) => {
          console.log('data', data);
          this.router.navigateByUrl('/admin-product');
          const modalRef = this.modalService.open(AlertModalComponent);

          modalRef.componentInstance.mensaje =
            'Se ha registrado el producto correctamente.';
          modalRef.componentInstance.typeMessage = 'Info';
          setTimeout(() => {
            this.modalService.dismissAll('ModalAddProductComponent');
            location.reload();
          }, 1200);
        },
        (error) => {
          console.error('Error creating product:', error);
          this.router.navigateByUrl('/admin-product');
          const modalRef = this.modalService.open(AlertModalComponent);
          modalRef.componentInstance.mensaje =
            'Ocurrió un error al registrar el producto.';
          modalRef.componentInstance.typeMessage = 'Warning';
        }
      );
    } else {
      const modalRef = this.modalService.open(AlertModalComponent);
      modalRef.componentInstance.mensaje =
        'Por favor ingresar los datos correctamente, todos son obligatorios.';
      modalRef.componentInstance.typeMessage = 'Info';
    }
  }

  generarSlug(texto: string): string {
    const slug = texto
      .trim() // Elimina espacios en blanco al principio y al final
      .toLowerCase() // Convierte todo a minúsculas
      .replace(/[^a-zA-Z0-9-]/g, '-') // Reemplaza caracteres no alfanuméricos con guiones
      .replace(/-+/g, '-') // Reemplaza múltiples guiones con uno solo
      .replace(/^-|-$/g, ''); // Elimina guiones al principio y al final

    return slug;
  }
}
