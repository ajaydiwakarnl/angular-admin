import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../notification.service';
import {Router} from '@angular/router';
import {environment as env} from '../../../environments/environment';
interface LoginResponse {
  success: boolean;
  message: string;
  data: any;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
    return this.http.post<LoginResponse>(`${env.adminbaseURL}/login`, {email, password}).subscribe(data => {
      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('accessToken', data.accessToken);
        this.loginStatus = true;
        this.router.navigate(['/admin']);
        this.toast.showSuccess(data.message, 'Success');
      } else {
        this.toast.showError(data.message, 'Success');
      }
    });
  }
}
