import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router'

import { HttpServices } from '../http.Services'
import { AuthServices } from '../auth/auth.service'
import { IPermission } from '../../../../server/apps/restful/interfaces/Permission.interface'
import { TokenService } from '../token.service'
// import { IAuthModel } from '../../../../server/apps/restful/interfaces/Auth.interface'


interface IPermissionService {
    savePermission(auth: string, permission: IPermission): Observable<boolean>
    encodePermission(pre: string | object): Observable<object>
    // getAuth<IAuthModel>(auth: string): Observable<IAuthModel>
    // getPermission<IPermission>(auth: string): Observable<IPermission>
}


@Injectable()
export class PermissionService extends AuthServices implements IPermissionService {

    constructor(
        http: HttpClient,
        router: Router,
        private serviceHttp: HttpServices,
        private tk: TokenService,
    ) {
        super(http, serviceHttp, tk, router)
    }

    savePermission(auth: string, permission: IPermission): Observable<any> {
        if (auth.length === 8 && Object.keys(permission).length) {
            let options = this.serviceHttp.optionsRequest
            options.headers = this.serviceHttp.getHeaders()
            let params = { auth, permission }
            return this.http.put('/restful/auth/permission', params, options)
        } else {
            return Observable.create((obsever) => {
                obsever.next(
                    {
                        status: false,
                        raise: 'parameters invalid!'
                    })
                obsever.complete()
            })
        }
    }

    encodePermission(pre: string | object): Observable<object> {
        return this.http.post('/restful/auth/gentoken', {pre: pre}, {headers: this.serviceHttp.getHeaders()})
    }



}


