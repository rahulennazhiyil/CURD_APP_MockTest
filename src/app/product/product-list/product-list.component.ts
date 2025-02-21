import { Component } from '@angular/core';
import { ProductServiceService } from '../../service/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  productList: any[];
  isDeleteDialog = false;
  productId: any;
  paginatedProductList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private productService: ProductServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productService.getAllProducts().subscribe(data =>{
      this.productList = data;
      this.updatePagination();
    });
  }

  viewDetails() {
    this.router.navigateByUrl('/product/details')
  }

  deleteProduct() {
    this.loadData();
    this.currentPage = Math.round(this.productList.length / this.itemsPerPage);
    this.isDeleteDialog = false;
  }

  openModal(productId: any) {
    this.isDeleteDialog = true;
    this.productId = productId;
  }

  closeModal() {
    this.isDeleteDialog = false;
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.productList.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProductList = this.productList.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

}
