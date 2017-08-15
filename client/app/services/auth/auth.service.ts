import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpServices } from '../../services/http.Services';

@Injectable()
export class AuthServices {

    public  static isLoggedIn = false;
    public static isAdmin = false;


    constructor(private http: Http, private httpService: HttpServices) { }

    loginService(credentials: any): Observable<any> {
        return this.http.post('/restful/auth/signin', credentials, this.httpService.optionsHeaders);
    }

    logoutService(): void {
        localStorage.removeItem('token');
        AuthServices.isLoggedIn = false;
        AuthServices.isAdmin = false;
    }

}
