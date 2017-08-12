import { Component, OnInit } from '@angular/core';

import { UserServices } from '../services/auth/user.services';

@Component({
    templateUrl: './login.template.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    constructor(private userService: UserServices) { }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }

    submitAuth(): void {

        this.userService.loginService({})
            .subscribe(
                response => console.log(response),
                err => console.error(err)
            );
    }

}
