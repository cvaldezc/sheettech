import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdInputModule,
  MdCheckboxModule
} from '@angular/material';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MdInputModule,
    MdCheckboxModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  exports: [AuthComponent, MdInputModule]
})
export class AuthModule { }
