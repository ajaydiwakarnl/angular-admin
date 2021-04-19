import { Component, OnInit } from '@angular/core';
import {ProductItem, ProductService} from './product.service';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productList: Observable<ProductItem[]>;
  constructor(public  productService: ProductService,
              public  formBuilder: FormBuilder,
              public router: Router,
              public toast: NotificationService) { }

  async ngOnInit() {
    this.productList = this.productService.productList();
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
}
