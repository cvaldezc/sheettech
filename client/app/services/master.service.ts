import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HttpServices } from './http.Services';
import { IMaster } from '../../../server/apps/restful/interfaces/Master.interface';


interface IMasterService extends HttpServices {
    findRemoteCode(code: string): Observable<Array<IMaster>>
    findRemoteNames(names: string): Observable<Array<IMaster>>
}

export class MasterService extends HttpClient implements IMasterService {
    public setHttpParams(params: string | object): HttpParams {
        return new HttpParams()
    }
    public token: string;
    public parameters: HttpParams;
    public optionsRequest: { headers: any; params: HttpParams; responseType: any };
    public getHeaders(): HttpHeaders {
        return new HttpHeaders()
    }

    findRemoteCode(code: string): Observable<Array<IMaster>> {
        let options = this.optionsRequest
        // options['responseType'] = 'json'
        return this.get<Array<IMaster>>(`/restful/master/find/code/${code}`, options)
    }

    findRemoteNames(names: string): Observable<Array<IMaster>> {
        let options = this.optionsRequest
        // options['responseType'] = 'json'
        return this.get<Array<IMaster>>(`/restful/master/find/name/${names}`, options)
    }

}
