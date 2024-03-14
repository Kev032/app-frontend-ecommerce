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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass'],
})
export class EditProductComponent {
  faImage = faImage;
  faSave = faSave;
  faPlus = faPlus;
  faRightFromBracket = faRightFromBracket;
  productSelected: any;

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
      image: ['', Validators.required],
    });
  }

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

  ngOnInit(): void {
    this.productSelected = this.productService.getProductsSelected();

    console.log('this.productSelected', this.productSelected);

    this.formulario.setValue({
      name: this.productSelected.name,
      description: this.productSelected.description,
      price: this.productSelected.price,
      quantity: this.productSelected.quantity,
      image: this.productSelected.image,
    });
  }

  saveProduct() {
    if (this.formulario?.valid) {
      const productData = new FormData();
      const product = {
        id: this.productSelected.id,
        name: this.formulario.get('name')?.value,
        description: this.formulario.get('description')?.value,
        price: this.formulario.get('price')?.value,
        quantity: this.formulario.get('quantity')?.value,
      };

      console.log('Imagen de product', this.formulario.get('image')?.value);
      console.log('Cual de las Img', this.formulario.get('image')?.value);
      productData.append('product', JSON.stringify(product));
      productData.append(
        'image',
        this.formulario.get('image')?.value
          ? this.esBlob(this.formulario.get('image')?.value)
            ? this.formulario.get('image')?.value
            : this.base64toBlob(this.formulario.get('image')?.value)
          : this.base64toBlob(this.productSelected.image)
      );

      this.productService.updateProduct(productData).subscribe(
        (data) => {
          console.log('data', data);
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
  esBlob(valor: any): boolean {
    return valor instanceof Blob;
  }

  base64toBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    const mimeType = 'image/png';

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mimeType });
  }
}
