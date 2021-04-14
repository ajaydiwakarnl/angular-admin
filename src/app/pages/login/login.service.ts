import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../notification.service';
import {Router} from '@angular/router';

interface LoginResponse {
  success: boolean;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://localhost:2000/api/';
  loginStatus = false;
  constructor(public  http: HttpClient, public toast: NotificationService, public  router: Router) {
    this.loginStatus = localStorage.getItem('isLoggedIn') === 'true';
  }

  get isLoggedIn() {
    return this.loginStatus;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.loginStatus = false;
    this.router.navigate(['/auth']);
    this.toast.showSuccess('Successfully logged out', 'Success');
  }

  login(email, password) {
    return this.http.post<LoginResponse>(this.baseUrl + 'login', {email, password}).subscribe(data => {
      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        this.loginStatus = true;
        this.router.navigate(['/admin']);
        this.toast.showSuccess(data.message, 'Success');
      } else {
        this.toast.showError(data.message, 'Success');
      }
    });
  }
}
