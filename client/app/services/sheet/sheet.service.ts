import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HttpServices } from '../http.Services';
import { ISheet } from '../../../../server/apps/restful/interfaces/Sheet.interface';


interface ISheetService {
    save(form: FormData): any
}

@Injectable()
export class SheetService implements ISheetService {

    constructor(
        private http: HttpClient,
        private httpServ: HttpServices)
    {
        // this.http.post()
    }

    /**
     * save
     */
    save(form: FormData) {
        let options = this.httpServ.optionsRequest
        let headers = this.httpServ.getHeaders()
        options['reportProgress'] = true
        options.headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')
        return this.http.post('/restful/sheet/save', form, options)
    }

}
