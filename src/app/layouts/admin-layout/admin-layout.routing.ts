import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {ProductComponent} from '../../pages/product/product.component';
import {AddProductComponent} from '../../pages/product/add-product/add-product.component';
import {AdminLayoutComponent} from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [],
    children: [
      { path: 'dashboard',    component: DashboardComponent },
      { path: 'product',      component: ProductComponent },
      { path: 'add-product',  component: AddProductComponent },
      { path: 'edit/:id',     component: AddProductComponent },
      { path: '**',  redirectTo: 'dashboard' } ,
    ]
  }
];
