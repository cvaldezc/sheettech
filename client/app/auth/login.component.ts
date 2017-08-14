import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

import { AuthServices } from '../services/auth/auth.service';


interface ILoginComponent {
    auth: object;
    isProcess: boolean;
}

@Component({
    templateUrl: './login.template.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, ILoginComponent {

    auth = { user: '', passwd: '' };
    isProcess = false;

    constructor(
        private authService: AuthServices,
        private notify: NotificationsService,
        private router: Router) { }

    public options = {
        position: ['top', 'right'],
        timeOut: 0,
        lastOnBottom: true,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        animate: 'scale'
    };

    ngOnInit(): void {
        console.log('Status logged');
        console.log(this.authService.isLoggedIn);
     }

    submitAuth(): void {
        // tslint:disable-next-line
        // this.notify.html('<i class="material-icons md-24 fa-spin">access_time</i> <strong>Procesando...!</strong>', 'black',
        // tslint:disable-next-line:radix
        // { timeOut: parseInt(undefined), theClass: 'grey darken-3', clickToClose: false });
        this.isProcess = true;
        this.authService.loginService(this.auth)
            .subscribe(
                response => {
                    console.log(response);
                    this.isProcess = false;
                    if (response.status === 206) {
                        this.notify.bare('', `${response._body.raise}`, { timeOut: 2600, theClass: 'red accent-1'});
                    }
                    if (response.status === 200 && response._body.raise === 'Not register') {
                        // redirect to set permission by auth
                        localStorage.setItem('token', `Beare ${response._body.token}`);
                        this.notify.success('Correcto, ingreso por primera vez!', '', {timeOut: 2600});
                        this.authService.isAdmin = true;
                        this.authService.isLoggedIn = true;
                        setTimeout( () => this.router.navigate([`/auth/permission/${response._body.response.auth}`]) , 2600);
                    } else if (response.status === 200) {
                        // redirect to Library
                        localStorage.setItem('token', `Beare ${response._body.token}`);
                        this.notify.success('Acceso Correcto!', '', { timeOut: 2600 });
                        this.authService.isLoggedIn = true;
                        setTimeout( () => this.router.navigate(['/']) , 2600);
                    }
                },
                err => {
                    console.log(err);
                    this.notify.bare('', `${err._body.raise}`, { timeOut: 5000, theClass: 'red accent-1' });
                    this.isProcess = false;
                }
            );
    }

}
