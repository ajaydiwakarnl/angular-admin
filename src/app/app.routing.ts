import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {AdminGuardGuard} from './admin-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivateChild: [AuthGuard],
    loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
  },
  {
    path: 'admin',
    canActivateChild: [AdminGuardGuard],
    loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false,
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
