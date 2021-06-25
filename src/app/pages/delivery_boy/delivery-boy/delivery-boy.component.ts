import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-boy',
  templateUrl: './delivery-boy.component.html',
  styleUrls: ['./delivery-boy.component.css']
})
export class DeliveryBoyComponent implements OnInit {
  deliveryBoyList: any;
  totalRecords: any;
  recordsPerPage: any;

  constructor() { }

  ngOnInit(): void {
  }

  showDetail(id) {

  }

  approved(id) {

  }

  displayActivePage($event: number) {

  }
}
