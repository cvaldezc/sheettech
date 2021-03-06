import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import {
  MdCardModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdSidenavModule,
  MdListModule,
  MdToolbarModule
} from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'
import { SimpleNotificationsModule } from 'angular2-notifications'

import { AuthRoutingModule } from './auth-routing.module'
import { AuthComponent } from './auth.component'
import { LoginComponent } from './login.component'
import { LogoutComponent } from './logout.component'
// import { FindComponent } from './findremote/find.component'
import { AuthServices } from '../services/auth/auth.service'
import { HttpServices } from '../services/http.Services'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
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
