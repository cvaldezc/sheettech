import { Component, OnInit } from '@angular/core';

import { UserServices } from '../services/auth/user.service';


interface ILoginComponent {
    auth: object;
}

@Component({
    templateUrl: './login.template.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, ILoginComponent {

    auth = { user: '', passwd: '' };

    constructor(private userService: UserServices) { }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }

    submitAuth(): void {

        this.userService.loginService(this.auth)
            .subscribe(
                response => console.log(response),
                err => console.error(err)
            );
    }

}
