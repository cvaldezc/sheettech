import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HttpServices } from '../http.Services';
import { ISheet } from '../../../../server/apps/restful/interfaces/Sheet.interface';
import { ResponseContentType } from '@angular/http';


interface ISheetService {
    save(form: FormData): any
    finds(params: any): Observable< ISheet[] >
    getAttachment(sheet: string): Observable< Blob >
    getByID(sheet: string): Observable< ISheet>
    findSheetRelated(params: object): Observable< ISheet[] >
}

@Injectable()
export class SheetService implements ISheetService {

    constructor(
        private http: HttpClient,
        private httpServ: HttpServices
    ) {  }

    /**
     * getByID
     */
    public getByID(sheet): Observable<ISheet> {
        return this.http.post<ISheet>(`/restful/sheet/${sheet}`, null, this.httpServ.optionsRequest)
    }


    /**
     * getAttachment
     * return file in type blob
     */
    public getAttachment(sheet: string): Observable<Blob> {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'blob'
        return this.http.get<Blob>(`/restful/sheet/attachment/${sheet}`, options)
    }

    /**
     * finds
     */
    public finds(params: object): Observable<ISheet[]> {
        let options = this.httpServ.optionsRequest
        options.headers = this.httpServ.getHeaders()
        options.params = this.httpServ.setHttpParams(params)
        options.responseType = 'json'
        return this.http.get<ISheet[]>('/restful/sheet/finds', options)
    }

    /**
     * find sheet Related
     */
    public findSheetRelated(params: object): Observable<ISheet[]> {
        let options = this.httpServ.optionsRequest
        options.params = this.httpServ.setHttpParams(params)
        return this.http.get<Array<ISheet>>('/result/sheet/related', options)
    }
    /**
     * save
     */
    save(form: FormData): Observable<HttpEvent<{}>> {
        let options = this.httpServ.optionsRequest
        let headers = this.httpServ.getHeaders()
        options['reportProgress'] = true
        options.headers = headers
            .delete('Content-Type')
            // .set('Content-Type', undefined)
        const req = new HttpRequest('POST', '/restful/sheet/save', form, options)
        return this.http.request(req)
        // return this.http.post('/restful/sheet/save', form, options)
    }



}
