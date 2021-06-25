import { Component, OnInit } from '@angular/core';
import {Users, UserService} from './users.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  keyword: any;
  userLists: Array<Users>;
  totalRecords: any;
  recordsPerPage = 10;

  constructor(public userServices: UserService, public router: Router, public toast: NotificationService) {}

  ngOnInit(): void {
    this.getUserList(1);
  }

  searchKeyword($event, page) {
    console.log($event);
    if ($event !== '') {
      this.keyword = $event;
      this.userServices.getUserSearch(this.keyword, page, this.recordsPerPage).subscribe(res => {
        this.userLists = res.data;
        this.totalRecords = res.totalPageCount;
      });
    } else {
      this.getUserList(1);
    }

  }
  getUserList(page) {

    if (this.keyword === undefined ) {
        this.userServices.getUserList(page, this.recordsPerPage).subscribe(res => {
        this.userLists = res.data;
        this.totalRecords = res.totalPageCount;
      });
    }

  }

  changeStatus(id, isBlocked) {
    this.userServices.changeStatus(id, isBlocked).subscribe(res => {
      if (res.success === true) {
        this.router.navigate(['/admin/users']);
        this.toast.showSuccess(res.message, 'Success');
      } else {
        this.toast.showError(res.message, 'Error');
      }
    });
  }
  displayActivePage(activePageNumber) {
    this.getUserList(activePageNumber);
  }

  showDetail(id) {
    this.router.navigate(['admin/users/view-detail', id]);
  }
}
