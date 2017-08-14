import { Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    NavigationExtras,
    Route } from '@angular/router';

import { AuthServices } from '../services/auth/auth.service';

@Injectable()
export class AuthGuardLoign implements CanActivate {

    constructor(public authService: AuthServices, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string;
        url = state.url;

        return this.checkLogin(url);
    }

    cantActiveteChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        // tslint:disable-next-line
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    private checkLogin(url: string): boolean {
        if (localStorage.getItem('token') !== null) {
            // fetch()
            return true;
        } else {
            // if (this.authService.isLoggedIn) { return true; }
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
