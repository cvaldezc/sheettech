import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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


@NgModule({
  imports: [
    CommonModule,
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
  exports: [AuthComponent, MdInputModule]
})
export class AuthModule { }
