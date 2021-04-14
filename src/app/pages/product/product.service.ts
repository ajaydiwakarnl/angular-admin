import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

export interface ProductItem {
  attributes: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
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
}
