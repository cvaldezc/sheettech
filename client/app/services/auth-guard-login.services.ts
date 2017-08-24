import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Router,
    RouterStateSnapshot,
    NavigationExtras,
    Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import * as jwt_decode from 'jwt-decode';
// import * as moment from 'moment';

import { TokenService } from './token.service';
import { HttpServices } from '../services/http.Services';
import { AuthServices } from '../services/auth/auth.service';
import { IAuthGuard } from '../../../server/apps/restful/interfaces/AuthGuard.interface';


@Injectable()
export class AuthGuardLoign implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthServices,
        private httpService: HttpServices,
        private tokenService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
        let url: string;
        url = state.url;

        return this.checkLogin(url)
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): Observable<boolean>|boolean {
        let url = `/${route.path}`;
        return this.checkLogin(url)
    }

    checkLogin(url: string): Observable<boolean> {
        console.log('THIS IS URL IN CHECKLOGIN ', url);
        // tslint:disable-next-line
        var status: Observable<boolean> = Observable.create(
            (observer) => {
                this.tokenService.decodedTokenLocal().subscribe( (next: any) => {
                    // console.log(next , 'DECODE TOKEN LOCAL')
                    if (url.startsWith('/login') && next.status) {
                        this.router.navigateByUrl('/');
                        next.status = true
                    }
                    if (!next.status && !url.startsWith('/login')) {
                        this.redirectLogin()
                        next.status = true
                    }
                    if (url.startsWith('/login') && !next.status) {
                        next.status = true
                    }
                    console.log('STATUS IS RETURN FOR CAN INSIDE ', next);
                    observer.next( next.status )
                    observer.complete()
                });
            });
        return status;
    }

    private redirectLogin() {
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
    }



}
