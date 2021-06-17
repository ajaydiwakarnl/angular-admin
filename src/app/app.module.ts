import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService} from './notification.service';
import { ProductComponent } from './pages/product/product.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import {NgxEditorModule} from 'ngx-editor';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        NgxEditorModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        AgmCoreModule.forRoot({
        //  apiKey: 'AIzaSyBTH_dyBbthf89iPZMs0b3c_F3K-QYcS_M',
         apiKey: 'AIzaSyCuMsQ_KY7KLSTUNQqBZ1IYhkyFNR8sugI',
          libraries: ['places'],
        })
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ProductComponent,
    AddProductComponent,

  ],
  providers: [
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
