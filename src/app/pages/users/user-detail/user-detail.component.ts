import { Component, OnInit } from '@angular/core';
import {Users, UserService} from '../users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../notification.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  src: any;
  userName: any;
  email: any;
  phone: any;
  private id: any;
  tabActive: any;
  addressLists: Array<Users>;
  totalRecords: any;
  recordsPerPage: any;
  status: any;
  constructor(public userService: UserService, private activRoute: ActivatedRoute, public router: Router, public toast: NotificationService) {}

  ngOnInit(): void {
    this.id = this.activRoute.snapshot.params['id'];
    this.tabActive = 'address';
    this.getUser(this.id);
  }

  getUser(id) {
    this.userService.getUser(id).subscribe(res => {
      this.src = 'http://localhost:2000/users/' + res.user.image;
      this.userName = res.user.name;
      this.email = res.user.email;
      this.phone = res.user.phone;
      this.status = res.user.isBlocked ===  0 ? 'Active' : 'Disable';
      this.addressLists = res.address;
    });
  }

  changeTab(tab) {
    this.tabActive = tab;
  }

  displayActivePage($event: number) {
  }

  changeStatus(isBlocked) {
    this.userService.changeStatus(this.id, isBlocked).subscribe(res => {
      if (res.success === true) {
        this.router.navigate(['admin/users/view-detail', this.id]);
        this.toast.showSuccess(res.message, 'Success');
      } else {
        this.toast.showError(res.message, 'Error');
      }
    });
  }
}
