import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { PermissionGuard } from "../permission-guard.service"
import { HttpServices } from '../../services/http.Services'
import { IAuthModel } from '../../../../server/apps/restful/interfaces/Auth.interface'
import { IPermission } from '../../../../server/apps/restful/interfaces/Permission.interface'
import { TokenService } from '../../services/token.service'


interface IAuthService {
    loginService(credentials: any): Observable<any>
    logoutService(): void
    getAuth(auth: string): Observable<IAuthModel>
    getAuthsRegister(): Observable<IAuthModel[]>
    findUserRemote(opt: object): Observable<any>
    addUserRemote(user: object): Observable<boolean>
    removeUser(auth: string): Observable<any>
}

@Injectable()
export class AuthServices extends PermissionGuard implements IAuthService {

    public isLoggedIn = false
    public isAdmin = false
    public permission: IPermission = {
        reader: false,
        write: false,
        delete: false
    }
    public _auth: string
    public _uid: string

    constructor(
        public http: HttpClient,
        private httpService: HttpServices,
        private tkServ: TokenService,
        private router: Router
    ) {
            super()
            //console.log(Date.now())
            //this.tokenLocal().then(res => console.log(Date.now()))
    }

    public async tokenLocal() {
        await this.decodePermission().subscribe(_permission => this.permission = _permission)
        await this.tkServ.decodedTokenLocal().subscribe(async (res) => {
            // console.log('AUTH SERVICE RESPONSE ', res)
            if (res.hasOwnProperty('raise')) {
                console.log(`Error: ${res['raise']}`)
                // this.router.navigate(['/logout'])
                // console.log('inside router')
            } else {
                this.isAdmin = await res['payload']['isAdmin']
                this._auth = await res['payload']['auth']
                this.getAuthID(this._auth).subscribe( isuid => {
                    // console.warn(isuid)
                    this._uid = isuid
                    // console.log('UID USER', this._uid)
                }, err => {
                    console.error(err)
                })
            }
        })
    }

    public loginService(credentials: any): Observable<any> {
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()
        options.params = this.httpService.setHttpParams()
        options['observe'] = 'response'
        return this.http.post('/restful/auth/signin', credentials, options)
    }

    public logoutService(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('permission')
        AuthServices.prototype.isLoggedIn = false
        AuthServices.prototype.isAdmin = false
    }

    public getAuth<IAuthModel>(auth: string): Observable<IAuthModel> {
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()
        options.params = this.httpService.parameters.set('auth', auth)
        options['responseType'] = 'json'
        return this.http.get<IAuthModel>('/restful/auth/', options)
    }

    /**
     * getAuthsRegister
     */
    public getAuthsRegister(): Observable<IAuthModel[]>{
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()
        options.params = this.httpService.setHttpParams()
        options['responseType'] = 'json'
        return this.http.get<IAuthModel[]>('/restful/auth/all', options)
    }

    /**
     * getAuthID
     * @param auth
     * @method POST
     */
    private getAuthID(auth: string): Observable<string> {
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()
        options.params = this.httpService.setHttpParams()
        options['responseType'] = 'text'
        return this.http.post<string>('/restful/auth/UID', { auth: auth }, options)
    }


    /**
     * findUserRemote
     */
    public findUserRemote(opt: object): Observable<any> {
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()
        options.params = this.httpService.setHttpParams(opt)
        options['responseType'] = 'json'
        return this.http.get('/restful/auth/remote/find', options)
    }

    /**
     * addUserRemote
     */
    public addUserRemote(user: object): Observable<boolean> {
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()
        options.params = this.httpService.setHttpParams()
        options['responseType'] = 'json'
        return this.http.post<boolean>('/restful/auth/create', user, options)
    }

    /**
     * removeUser
     */
    public removeUser(auth: string): Observable<any> {
        let options = this.httpService.optionsRequest
        options.headers = this.httpService.getHeaders()
        options.params = this.httpService.setHttpParams()
        options['responseType'] = 'json'
        options['body'] = { auth: auth }
        return this.http.delete('/restful/auth/remove', options)
    }


}
