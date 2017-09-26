import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServices } from '../services/auth/auth.service';

// interface ILogout { }

@Component({
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

    constructor(
        private auth: AuthServices,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.auth.logoutService();
        setTimeout( () => {
            this.router.navigate(['/login'])
        }, 3600);
    }

}
