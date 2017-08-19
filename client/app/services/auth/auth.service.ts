import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpServices } from '../../services/http.Services';

@Injectable()
export class AuthServices {

    public  static isLoggedIn = false;
    public static isAdmin = false;


    constructor(private http: HttpClient, private httpService: HttpServices) { }

    loginService(credentials: any): Observable<any> {
        return this.http.post(
            '/restful/auth/signin',
            credentials,
            this.httpService.optionsRequest);
    }

    logoutService(): void {
        localStorage.removeItem('token');
        AuthServices.isLoggedIn = false;
        AuthServices.isAdmin = false;
    }

}
