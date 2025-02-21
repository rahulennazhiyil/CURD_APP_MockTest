import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../service/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: any | undefined;
  productForm: FormGroup;
  isEdit: boolean = false;
  productId: any = '';

  constructor(
    private route: ActivatedRoute,
    private ProductServiceService: ProductServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.productId = id;
      this.getProduct(this.productId)
    } else {
      this.isEdit = true;
    }
  }

  getProduct(id: any) {
    this.ProductServiceService.getProduct(id).subscribe(
      (data) => this.product = data
    );
  }

  onEdit() {
    this.isEdit = true;
    this.productForm.patchValue(this.product);
  }

  onSubmit() {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return
    }
    const product = this.productForm.value;
    if (this.isEdit && this.productId) {
      product.id = this.productId;
      this.ProductServiceService.updateProduct(product).subscribe(() => {
        alert('Updated Successfully');
        this.getProduct(this.productId);
        this.isEdit = false;
      },
        (error) => console.error(error))
    }
    else {
      this.ProductServiceService.addProduct(product).subscribe(() =>
        this.router.navigateByUrl('/product/list'),
        (error) => console.error(error)
      );
    }
  }

  reset() {
    this.productForm.reset();
  }

}
