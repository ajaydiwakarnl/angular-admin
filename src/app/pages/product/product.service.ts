import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';

export interface ProductItem {
  id: number;
  attributes: string;
  name: string;
  sku: string;
  condition: string;
  category: string;
  sub_category: string;
  child_category: string;
  estimate_shipping_time: string;
  size_name: string;
  size_qty: string;
  size_price: string;
  whole_sale_qty: string;
  whole_sale_discount: string;
  stock: string;
  description: string;
  return_policy: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  image: string;
  price: string;
  youtube_url: string;
  status: number;
}

interface ProductResponse {
  success: boolean;
  message: string;
  data: ProductItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:2000/api/product/';
  responeData: any;
  constructor(public  http: HttpClient, public  router: Router) {}

  productList() {
    return this.http.get<ProductResponse>(this.baseUrl + 'index').pipe(
      map(d => d.data)
    );
  }
  saveProduct(formData) {
    return this.http.post<ProductResponse>(this.baseUrl + 'create', formData);
  }
  changeStatus(id, status) {
    return this.http.post<ProductResponse>(this.baseUrl + 'changeStatus', {id, status});
  }

  editProduct(id) {
    return this.http.post<ProductResponse>(this.baseUrl + 'editProduct', {id});
  }
}
