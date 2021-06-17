import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment as env} from '../../../environments/environment';

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

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  totalPageCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(public http: HttpClient, public router: Router) {
  }

  productList(page, limit) {
    console.log(page);
    return this.http.get<ApiResponse<Array<ProductItem>>>(`${env.baseURL}/products?page=${page}&limit=${limit}`);
  }

  saveProduct(_, formData) {
    return this.http.post<ApiResponse<String>>(`${env.baseURL}/product`, formData);
  }

  updateProduct(id, formData) {
    return this.http.post<ApiResponse<String>>(`${env.baseURL}/product/${id}`, formData);
  }

  changeStatus(id, status) {
    return this.http.post<ApiResponse<String>>(`${env.baseURL}/product/changeStatus`, {id, status});
  }

  getProductById(id) {
    return this.http.get<ApiResponse<ProductItem>>(`${env.baseURL}/product/${id}`);
  }

  searchProduct(keyword) {
    return this.http.get<ApiResponse<Array<ProductItem>>>(`${env.baseURL}/product/search/${keyword}`).pipe(map(d => d.data));
  }
}
