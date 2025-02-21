import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductServiceService } from '../../service/product-service.service';

@Component({
  selector: 'app-product-delete',
  standalone: false,
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.scss'
})
export class ProductDeleteComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() deleteProd = new EventEmitter<void>();
  @Input() productId :any;

  constructor(private productService:ProductServiceService){}

  close() {
    this.closeModal.emit();
  }

  deleteProduct(){
    this.productService.deleteProduct(this.productId).subscribe(
      () => this.deleteProd.emit(),
      (error) => console.error(error)
    );
  }

}
