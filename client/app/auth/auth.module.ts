import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  MdCardModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdSidenavModule,
  MdListModule,
  MdToolbarModule
} from '@angular/material';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { AuthServices } from '../services/auth/auth.service';
import { HttpServices } from '../services/http.Services';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    AuthRoutingModule,
    FlexLayoutModule,
    MdInputModule,
    MdCheckboxModule,
    MdCardModule,
    MdButtonModule,
    MdSidenavModule,
    MdListModule,
    MdToolbarModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    LogoutComponent
  ],
  providers: [AuthServices, HttpServices],
  exports: []
})
export class AuthModule { }
