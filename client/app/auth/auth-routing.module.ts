import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthGuardLoign } from '../services/auth-guard-login.services';
import { AuthServices } from '../services/auth/auth.service';
import { UserServices } from '../services/auth/user.service';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';

const authroutes: Routes = [
  { path: '', component: AuthComponent, canActivate: [AuthGuardLoign] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLoign] },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(authroutes)],
  exports: [RouterModule],
  providers: [
    AuthGuardLoign,
    AuthServices,
    UserServices
  ]
})
export class AuthRoutingModule { }
