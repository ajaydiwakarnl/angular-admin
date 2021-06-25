import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment as env} from '../../../environments/environment';
import {ProductItem} from '../product/product.service';

export interface  Users {
  id: number;
  name: string;
  email: string;
  phone:  string;
  image:  string;
  isBlocked: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  totalPageCount: number;
  user: any;
  address: any;
}

@Injectable({
  providedIn : 'root'
})

export class  UserService {
  constructor(public http: HttpClient, public router: Router) {
  }
  getUserList(page, limit) {
    return this.http.get<ApiResponse<Array<Users>>>(`${env.adminbaseURL}/users?page=${page}&limit=${limit}`);
  }

  getUserSearch(keyword, page, limit ) {
    return this.http.get<ApiResponse<Array<Users>>>(`${env.adminbaseURL}/users/search/${keyword}?page=${page}&limit=${limit}`, );
  }

  changeStatus(id, isBlocked) {
    return this.http.post<ApiResponse<String>>(`${env.adminbaseURL}/users/changestatus`, {id, isBlocked});
  }
  getUser(id) {
    return this.http.post<ApiResponse<String>>(`${env.adminbaseURL}/users/getUser`, {id});
  }
}
