import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PermissionGuard } from "../permission-guard.service";
import { HttpServices } from '../../services/http.Services';
import { IAuthModel } from '../../../../server/apps/restful/interfaces/Auth.interface';
import { IPermission } from '../../../../server/apps/restful/interfaces/Permission.interface';


interface IAuthService {
    loginService(credentials: any): Observable<any>;
    logoutService(): void;
    getAuth(auth: string): Observable<IAuthModel>;
    getAuthsRegister(): Observable<IAuthModel[]>;
}

@Injectable()
export class AuthServices extends PermissionGuard implements IAuthService {

    public isLoggedIn = false;
    public isAdmin = false;
    public permission: IPermission

    constructor(
        public http: HttpClient,
        private httpService: HttpServices) {
            super();
            this.decodePermission().subscribe(_permission => this.permission = _permission)
    }

    public loginService(credentials: any): Observable<any> {
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()
        options['observe'] = 'response';
        return this.http.post('/restful/auth/signin', credentials, options);
    }

    public logoutService(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('permission');
        AuthServices.prototype.isLoggedIn = false;
        AuthServices.prototype.isAdmin = false;
    }

    public getAuth<IAuthModel>(auth: string): Observable<IAuthModel> {
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()
        options.params = this.httpService.parameters.set('auth', auth)
        // console.log('Parameters ', options);
        return this.http.get<IAuthModel>('/restful/auth/', options);
    }

    /**
     * getAuthsRegister
     */
    public getAuthsRegister(): Observable<IAuthModel[]>{
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()

        return this.http.get<IAuthModel[]>('/restful/auth/all', options)
    }


}
