import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthGuardLoign } from '../services/auth-guard-login.services';
import { AuthServices } from '../services/auth/auth.service';
import { UserServices } from '../services/auth/user.services';
import { LoginComponent } from './login.component';

const authroutes: Routes = [
  { path: '', component: AuthComponent, canActivate: [AuthGuardLoign] },
  { path: 'login', component: LoginComponent }
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
