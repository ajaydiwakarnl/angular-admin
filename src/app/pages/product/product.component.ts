import { Component, OnInit } from '@angular/core';
import {ProductItem, ProductService} from './product.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productList: Observable<ProductItem[]>;
  constructor(public  productService: ProductService) { }

  async ngOnInit() {
    this.productList = this.productService.productList();
  }

  changeStatus(id, status) {
      this.productService.changeStatus(id , status).subscribe(res => {
        console.log(res);
      });
  }
}
