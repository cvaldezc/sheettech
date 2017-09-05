import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HttpServices } from '../http.Services';
import { ISheet } from '../../../../server/apps/restful/interfaces/Sheet.interface';


interface ISheetService {
    save(form: FormData): any
    finds(params: any): Observable<ISheet[]>
}

@Injectable()
export class SheetService implements ISheetService {

    constructor(
        private http: HttpClient,
        private httpServ: HttpServices
    ) {  }


    /**
     * getAttachment
     */
    public getAttachment(sheet: string) {
        let options = this.httpServ.optionsRequest
        // options.headers = this.httpServ.getHeaders()
        return this.http.get(`/restful/sheet/attachment/${sheet}`, options)
            // .map( response => response)
    }

    /**
     * finds
     */
    public finds(params: object): Observable<ISheet[]> {
        let options = this.httpServ.optionsRequest
        options.params = this.httpServ.setHttpParams(params)
        // console.log(options)
        return this.http.get<ISheet[]>('/restful/sheet/finds', options)
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
