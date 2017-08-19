import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { HttpServices } from '../http.Services';
// import { AuthModels } from '../../models/auth.models';
import { IPermission } from '../../../../server/apps/restful/interfaces/Permission.interface';
import { IAuthModel } from '../../../../server/apps/restful/interfaces/Auth.interface';


interface IPermissionService {
    getAuth<IAuthModel>(auth: string): Observable<IAuthModel>;
    // getPermission<IPermission>(auth: string): Observable<IPermission>;
}


@Injectable()
export class PermissionService extends HttpServices implements IPermissionService {

    constructor(
        private http: HttpClient,
        private serviceHttp: HttpServices) {
        super();
    }

    getAuth<IAuthModel>(auth: string): Observable<IAuthModel> {
        this.optionsRequest.params.append('auth', auth);
        return this.http.get<IAuthModel>('/restful/auth/permission', this.optionsRequest);
    }

    //     getPermission<IPermission>(auth: string): Observable<IPermission> {
    //     let options: RequestOptionsArgs = this.shttp.optionsArgs;
    //     options.params['auth'] = auth;
    //     return this.http.get('/restful/auth/permission', options).map( response => <IPermission>response.json() );
    //         // .map( (response: Response) => <IPermission>response.json() );
    // }


}


