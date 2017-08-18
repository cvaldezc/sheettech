import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpServices } from '../http.Services';
// import { AuthModels } from '../../models/auth.models';
import { IPermission } from '../../../../server/apps/restful/interfaces/Permission.interface';


interface IPermissionService {
    getPermission(auth: string): Observable<any>;
}


@Injectable()
export class PermissionService  implements IPermissionService {

    constructor(
        private http: Http,
        private shttp: HttpServices) {
    }

    getPermission(auth: string): Observable<any> {
        return this.http.get(`/restful/auth/permission?auth=${auth}`);
    }


}


