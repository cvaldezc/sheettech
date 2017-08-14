import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdCardModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule
} from '@angular/material';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { UserServices } from '../services/auth/user.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
  providers: [],
  exports: [AuthComponent, MdInputModule]
})
export class AuthModule { }
