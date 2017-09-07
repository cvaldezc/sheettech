import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HttpServices } from '../http.Services';
import { IModel } from '../../../../server/apps/restful/interfaces/Model.interface';


interface IModelService {
    getModelRemote(): Observable<IModel[]>
    getModels(): Observable<IModel[]>
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


}
