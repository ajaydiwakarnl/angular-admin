import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from './pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivateChild {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.loginService.isLoggedIn) {
      return this.router.navigate(['/auth']);
    }
    return true;
  }
}
