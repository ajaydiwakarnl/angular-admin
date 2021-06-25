import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {ProductComponent} from '../../pages/product/product.component';
import {AddProductComponent} from '../../pages/product/add-product/add-product.component';
import {AdminLayoutComponent} from './admin-layout.component';
import {ProfileComponent} from '../../pages/profile/profile.component';
import {UsersComponent} from '../../pages/users/users.component';
import {UserDetailComponent} from '../../pages/users/user-detail/user-detail.component';
import {DeliveryBoyComponent} from '../../pages/delivery_boy/delivery-boy/delivery-boy.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [],
    children: [
      { path: 'dashboard',            component: DashboardComponent },
      { path: 'product',              component: ProductComponent },
      { path: 'add-product',          component: AddProductComponent },
      { path: 'product/edit/:id',     component: AddProductComponent },
      { path: 'profile',              component: ProfileComponent   },

      // Users related Routes
      { path: 'users',                  component: UsersComponent   },
      { path : 'users/view-detail/:id', component: UserDetailComponent},

      // Delivery Boy related Route
      { path: 'delivery_boy',      component: DeliveryBoyComponent },

      { path: '**',  redirectTo: 'dashboard' } ,
    ]
  }
];
