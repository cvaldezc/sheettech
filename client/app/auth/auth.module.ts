import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  MdCardModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule
} from '@angular/material';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { AuthServices } from '../services/auth/auth.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    AuthRoutingModule,
    FlexLayoutModule,
    MdInputModule,
    MdCheckboxModule,
    MdCardModule,
    MdButtonModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  providers: [AuthServices],
  exports: [AuthComponent, MdInputModule]
})
export class AuthModule { }
