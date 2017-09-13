import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'

import { HttpServices } from '../http.Services'
import { IModel } from '../../../../server/apps/restful/interfaces/Model.interface'


interface IModelService {
    getModelRemote(): Observable<IModel[]>
    getModels(): Observable<IModel[]>
    validate(pattern: string, lstPattern: Array<IModel>): Observable<IModel | boolean>
}


@Injectable()
export class ModelService implements IModelService {
    constructor(
        private http: HttpClient,
        private httpServ: HttpServices) {
    }

    getModelRemote(): Observable<IModel[]> {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'json'
        return this.http.get<IModel[]>('/restful/model/remote/all', this.httpServ.optionsRequest)
    }

    getModels(): Observable<IModel[]> {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'json'
        return this.http.get<IModel[]>('/restful/model/all', this.httpServ.optionsRequest)
    }

    validate(pattern: string, lstPattern: Array<IModel>): Observable<IModel | boolean> {
        return Observable.create( (observer: Observer<any>) =>{
            let index: number = lstPattern.findIndex( (_pattern) => typeof _pattern == 'object' ? new RegExp(`\\b${pattern}\\b`).test(_pattern.model) : false )
            if (index >= 0) {
                observer.next(lstPattern[index])
            } else {
                observer.error(false)
            }
            observer.complete()
        } )
    }


}
