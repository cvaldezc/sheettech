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
    public token: string;
    public parameters: HttpParams;
    public optionsRequest: { headers: any; params: HttpParams; };
    public getHeaders(): HttpHeaders {
        return new HttpHeaders()
    }

    findRemoteCode(code: string): Observable<Array<IMaster>> {
        return this.get<Array<IMaster>>(`/restful/master/find/code/${code}`, this.optionsRequest)
    }

    findRemoteNames(names: string): Observable<Array<IMaster>> {
        return this.get<Array<IMaster>>(`/restful/master/find/name/${names}`, this.optionsRequest)
    }

}
