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
        console.log('THIS IS URL IN CHECKLOGIN ', url);
        // tslint:disable-next-line
        let status: boolean;
        const prom: Observable<boolean> = Observable.create( (observer) => {
            try {
                if (localStorage.getItem('token') !== null) {
                    this.verifyToken().subscribe( response => {
                            console.log('response promise', response);
                            if (url.startsWith('/login') && response) {
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
            console.log('RESULT PROM IN CHECK LOGIN', res, 'STAR URL ', url.startsWith('/login'));
            status = res;
            if ( !status && !url.startsWith('/login')) {
                console.log('were redirect to login force ');
               return this.redirectLogin();
            } else {
                return status = true;
            }
        });
        console.log('STATUS IS RETURN FOR CAN ', status);
        return (status === undefined ? true : status);
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
        // tslint:disable-next-line:prefer-const
        let token = localStorage.getItem('token');
        if (token !== null) {
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
        } else {
            observer.next(false);
            observer.complete();
        }
        });
        return vtoken;
    }

    public decodeToken(): Observable<any> {
        // tslint:disable-next-line
        let vtoken = Observable.create( (observer) => {
        // tslint:disable-next-line:prefer-const
            let token = localStorage.getItem('token');
            if (token !== null) {
                this.http.post('/restful/auth/decode', { 'token': token }, this.httpService.optionsHeaders)
                .map( (res: any) => res.json() )
                .subscribe(
                    (response: any)  => {
                        observer.next(response);
                    },
                    (err) => {
                        observer.next({status: false, err});
                    });
            } else {
                observer.next({status: false});
            }
            observer.complete();
        });
        return vtoken;
    }

}
