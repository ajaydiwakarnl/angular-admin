import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {LoginService} from '../../pages/login/login.service';



declare interface HeaderInfo {
  path: string;
  title: string;
  icon: string;
  action: any;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public menuItems: any[];
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private loginService: LoginService,
  ) {
    this.location = location;
  }

  headerName: HeaderInfo[] = [
    { path: '/admin/profile', title: 'My Profile',  icon: 'ni-single-02', action: '' },
    { path: '/admin/profile', title: 'Settings',  icon: 'ni-settings-gear-65', action: ''},
    { path: '#', title: 'Logout',  icon: 'ni-user-run', action: this.doLogout.bind(this)},
  ];

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.menuItems = this.headerName.filter(menuItem => menuItem);
  }
  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
        titlee = titlee.slice( 1 );
    }

    for (let item = 0; item < this.listTitles.length; item++) {
        if (this.listTitles[item].path === titlee) {
            return this.listTitles[item].title;
        }
    }

    return  'Dashboard';
  }

  doLogout() {
    this.loginService.logout();
  }

}

