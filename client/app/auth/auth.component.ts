import { Component, OnInit } from '@angular/core';

import { AuthServices } from '../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(private _auth: AuthServices) { }

  ngOnInit() {
    console.log('Status Logged');
    console.log(AuthServices.isLoggedIn);
  }

}
