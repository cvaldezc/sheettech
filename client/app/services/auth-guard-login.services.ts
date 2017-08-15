import { Injectable} from '@angular/core';
import { Http, Headers, ResponseContentType, RequestOptions } from '@angular/http';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Router,
    RouterStateSnapshot,
    NavigationExtras,
    Route } from '@angular/router';

import { AuthServices } from '../services/auth/auth.service';


@Injectable()
export class AuthGuardLoign implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        public authService: AuthServices,
        private router: Router,
        private http: Http) { }

    private headers = new Headers({
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    });

    private optionsHeaders = new RequestOptions({
        headers: this.headers,
        responseType: ResponseContentType.Json
    });

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string;
        url = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        // tslint:disable-next-line
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    private checkLogin(url: string): boolean {
        if (localStorage.getItem('token') !== null) {
            // tslint:disable-next-line:prefer-const
            let token = localStorage.getItem('token');
            this.http.post('/restful/auth/decode', { 'token': token }, this.optionsHeaders)
                .map( res => res.json() ).subscribe(
                    (response: any)  => {
                        if (response.status) {
                            return true;
                        } else {
                            return this.redirectLogin();
                        }
                    },
                    (err) => {
                        return this.redirectLogin();
                    });
        } else {
            // Create a dummy session id
            return this.redirectLogin();
        }
    }

    private redirectLogin(): boolean {
        // tslint:disable-next-line
        let sessionId: number = Date.now();
        // Set our navigation extras object
        // that contains our global query params and fragment
        let navigationExtras: NavigationExtras;
        navigationExtras = {
            queryParams: { 'session_id': sessionId },
            fragment: 'anchor'
        };

        // Navigate to the login page with extras
        this.router.navigate(['/login'], navigationExtras);
        return false;
    }

}
