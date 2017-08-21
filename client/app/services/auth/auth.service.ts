import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpServices } from '../../services/http.Services';


interface IAuthService {
    loginService(credentials: any): Observable<any>;
    logoutService(): void;
    getAuth<IAuthModel>(auth: string): Observable<IAuthModel>;
}

@Injectable()
export class AuthServices implements IAuthService {

    public static isLoggedIn = false;
    public static isAdmin = false;


    constructor(
        public http: HttpClient,
        private httpService: HttpServices) { }

    public loginService(credentials: any): Observable<any> {
        let options = this.httpService.optionsRequest
        options['observe'] = 'response';
        return this.http.post('/restful/auth/signin', credentials, options);
    }

    public logoutService(): void {
        localStorage.removeItem('token');
        AuthServices.isLoggedIn = false;
        AuthServices.isAdmin = false;
    }

    public getAuth<IAuthModel>(auth: string): Observable<IAuthModel> {
        let options = this.httpService.optionsRequest
        options.params = this.httpService.parameters.set('auth', auth)
        console.log('Parameters ', options);
        return this.http.get<IAuthModel>('/restful/auth/permission', options);
    }

}
