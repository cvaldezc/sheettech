import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServices } from '../services/auth/auth.service';

// interface ILogout { }

@Component({
    template: '<h1>Hemos terminado la session correctamente</h1>'
})
export class LogoutComponent implements OnInit {
    constructor(private auth: AuthServices, private router: Router) { }

    ngOnInit(): void {
        this.auth.logoutService();
        setTimeout( () => this.router.navigate(['/login']) , 3600);
    }

}
