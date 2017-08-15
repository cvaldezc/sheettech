import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// import { AuthModels } from '../models/auth.models';

@Injectable()
export class AuthServices {

    public  static isLoggedIn = false;
    public static isAdmin = false;

    private headers = new Headers({
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    });
    private optionsHeaders = new RequestOptions({
        headers: this.headers,
        responseType: ResponseContentType.Json
    });

    constructor(private http: Http) { }

    loginService(credentials: any): Observable<any> {
        return this.http.post('/restful/auth/signin', credentials, this.optionsHeaders);
    }

    logoutService(): void {
        localStorage.removeItem('token');
        AuthServices.isLoggedIn = false;
        AuthServices.isAdmin = false;
    }

}
