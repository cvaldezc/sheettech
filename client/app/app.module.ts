import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdCardModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdSidenavModule,
  MdListModule,
  MdToolbarModule,
  MdMenuModule,
  MdIconModule,
  MdSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { PageNotFoundComponent } from './utils/not-found.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { MenuComponent } from './utils/menus/menu.component';
import { ToolBarComponent } from './utils/menus/toolbar.component';
import { PermissionService } from './services/main/permission.service';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details.component';

import { FilterPipe } from './pipes/filter.pipe';


@NgModule({

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SimpleNotificationsModule,
    MdCardModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdSidenavModule,
    MdListModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdSlideToggleModule
  ],
  declarations: [
    FilterPipe,
    AppComponent,
    MainComponent,
    ToolBarComponent,
    MenuComponent,
    PageNotFoundComponent,
    PermissionsComponent,
    UsersComponent,
    UserDetailsComponent
  ],
  providers: [PermissionService],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [ AppComponent ]
})
export class AppModule {

  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
