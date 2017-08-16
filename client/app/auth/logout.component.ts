import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

import { AuthServices } from '../services/auth/auth.service';

// interface ILogout { }

@Component({
    template: '<h1>Hemos terminado la session correctamente</h1>'
})
export class LogoutComponent implements OnInit {

    constructor(private auth: AuthServices) { }

    ngOnInit(): void {
        this.auth.logoutService();
        setTimeout( () => location.href = '/login' , 3600);
    }

}
