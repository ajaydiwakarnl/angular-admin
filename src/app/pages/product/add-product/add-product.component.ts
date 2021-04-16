import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ProductItem, ProductService} from '../product.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../notification.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productSubmitted = false;
  createProductForm: FormGroup;
  constructor(public  formBuilder: FormBuilder,
              public productService: ProductService,
              public route: Router,
              public toast: NotificationService) {}
  ngOnInit(): void {
    this.createProductForm = this.formBuilder.group({
      product_image             : ['', [Validators.required]],
      product_current_price     : ['', [Validators.required]],
      product_youtube_url       : [''],
      product_name              : ['', [Validators.required]],
      product_sku               : ['', [Validators.required]],
      allow_product_condition   : [false],
      product_condition         : [''],
      product_category          : ['', [Validators.required]],
      product_sub_category      : ['', [Validators.required]],
      product_child_category    : ['', [Validators.required]],
      allow_estimation_shiping_time : [false],
      product_shipping_time     : [''],
      allow_product_size        : [false],
      product_size              : [''],
      product_qty               : [''],
      product_size_price        : [''],
      allow_product_whole_sell  : [false],
      product_whole_qty         : [''],
      product_whole_discount    : [''],
      product_stock             : ['', [Validators.required]],
      product_description       : ['', [Validators.required]],
      product_return_ploicy     : ['', [Validators.required]],
      product_address           : ['', [Validators.required]],
      product_city              : ['', [Validators.required]],
      product_country           : ['', [Validators.required]],
      product_postal_code       : ['', [Validators.required]],
    });

    this.setConditionalValidations('allow_product_condition', 'product_condition', [Validators.required]);
    this.setConditionalValidations('allow_estimation_shiping_time', 'product_shipping_time', [Validators.required]);
    this.setConditionalValidations('allow_product_size', 'product_size', [Validators.required]);
    this.setConditionalValidations('allow_product_size', 'product_qty', [Validators.required]);
    this.setConditionalValidations('allow_product_size', 'product_size_price', [Validators.required]);



  }

  setConditionalValidations(dependsOn, control, validators) {
    this.createProductForm.get(dependsOn).valueChanges
      .subscribe(value => {
        this.createProductForm.get(control).setValidators(value ? validators : null);
        this.createProductForm.get(control).updateValueAndValidity();
      });
  }

  get productControlName() {
    return this.createProductForm.controls;
  }

  saveProduct() {
    this.productSubmitted = true;
    if (this.createProductForm.invalid) {
      console.log(this.createProductForm.value);
       return;
    } else {
      const formValue = this.createProductForm.value;
      this.productService.saveProduct(formValue).subscribe(res => {
        console.log(res);
        if (res.success === true) {
          this.route.navigate(['/admin/product']);
          this.toast.showSuccess(res.message, 'Success');
        } else {
          this.toast.showError(res.message, 'Error');
        }
      });
    }
  }


}
