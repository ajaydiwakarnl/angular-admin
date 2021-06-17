import {Component, OnInit} from '@angular/core';
import {ProductItem, ProductService} from './product.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  productList: Array<ProductItem>;
  keyword: any;
  totalRecords: any;
  recordsPerPage = 3;

  constructor(
    public productService: ProductService,
    public formBuilder: FormBuilder,
    public router: Router,
    public toast: NotificationService
  ) {
  }

  getDataForPage(page) {
    this.productService.productList(page, this.recordsPerPage).subscribe(res => {
      console.log(res.data);
      this.productList = res.data;
      this.totalRecords = res.totalPageCount;
    });
  }

  async ngOnInit() {
    this.getDataForPage(1);
  }

  changeStatus(id, status) {
    this.productService.changeStatus(id, status).subscribe(res => {
      if (res.success === true) {
        this.router.navigate(['/admin/product']);
        this.toast.showSuccess(res.message, 'Success');
      } else {
        this.toast.showError(res.message, 'Error');
      }
    });
  }

  editProduct(id) {
    this.router.navigate(['admin/edit', id]);
  }

  searchKeyword(event) {
    this.keyword = event;
    console.log(this.keyword);
    console.log(this.productList);
  }

  displayActivePage(activePageNumber) {
    this.getDataForPage(activePageNumber);
  }
}
