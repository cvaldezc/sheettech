import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Router,
    RouterStateSnapshot,
    NavigationExtras,
    Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { HttpServices } from '../services/http.Services';
import { AuthServices } from '../services/auth/auth.service';


@Injectable()
export class AuthGuardLoign implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private router: Router,
        private http: Http,
        private authService: AuthServices,
        private httpService: HttpServices) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string;
        url = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route) {
        // tslint:disable-next-line
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        // tslint:disable-next-line
        let status: boolean;
        const prom: Observable<boolean> = Observable.create( (observer) => {
            try {
                if (localStorage.getItem('token') !== null) {
                    this.verifyToken().subscribe( response => {
                            console.log('response promise', response);
                            if (this.router.url.startsWith('/login')) {
                                console.log('redirect to home');
                                this.router.navigate(['/']);
                            }
                            observer.next(response);
                            observer.complete();
                        }
                    );
                } else {
                    observer.next(false);
                    observer.complete();
                }
            } catch (error) {
                observer.next(false);
                observer.complete();
            }
        });
        prom.map( res => res).subscribe( res => {
            status = res;
        });
        return status;
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

    public verifyToken(): Observable<any> {
        // tslint:disable-next-line
        let vtoken = Observable.create( (observer) => {
            try {
                // tslint:disable-next-line:prefer-const
                let token = localStorage.getItem('token');
                this.http.post('/restful/auth/decode', { 'token': token }, this.httpService.optionsHeaders)
                    // .map( res => res.json() )
                    .subscribe(
                        (response: any)  => {
                            // console.log(response);
                            if (response._body.status) {
                                observer.next(true);
                                observer.complete();
                            } else {
                                observer.next(false);
                                observer.complete();
                            }
                        },
                        (err) => {
                            observer.next(false);
                            observer.complete();
                        });
            } catch (error) {
                observer.next(false);
                observer.complete();
            }
        });
        return vtoken;
    }

}
