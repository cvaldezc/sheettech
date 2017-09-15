import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { ISheet } from '../../../../server/apps/restful/interfaces/Sheet.interface';
import { HttpServices } from '../http.Services';
import { FavoriteService } from './favorite.service';


interface ISheetService {
    save(form: FormData): any
    finds(params: any): Observable< ISheet[] >
    getAttachment(sheet: string): Observable< Blob >
    getByID(sheet: string): Observable< ISheet>
    findSheetRelated(params: object): Observable< ISheet[] >
    saveRate(form: FormData): Observable< any >
    getRatingbySheet(sheet: string): Observable< number >
    updated(form: FormData): Observable<HttpEvent<object>>
}

@Injectable()
export class SheetService extends FavoriteService implements ISheetService {

    constructor(
        public http: HttpClient,
        public httpServ: HttpServices
    ) {
        super(http, httpServ);
    }

    /**
     * getByID
     */
    public getByID(sheet): Observable<ISheet> {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'json'
        return this.http.post<ISheet>(`/restful/sheet/encode/${sheet}`, null, this.httpServ.optionsRequest)
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
        options['responseType'] = 'json'
        return this.http.get<Array<ISheet>>('/restful/sheet/related', options)
    }

    /**
     * save
     */
    public save(form: FormData): Observable<HttpEvent<{}>> {
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

    /**
     * updated
     */
    public updated(form: FormData): Observable<HttpEvent<object>> {
        let options = this.httpServ.optionsRequest
        let headers = this.httpServ.getHeaders()
        options.params = this.httpServ.setHttpParams()
        options['reportProgress'] = true
        options.headers = headers.delete('Content-Type')
        const req =  new HttpRequest('PUT', '/restful/sheet/update', form, options)
        return this.http.request(req)
    }

    /**
     * deleted sheet
     */
    public deleted(sheet: string): Observable<boolean> {
        let options = this.httpServ.optionsRequest
        let headers = this.httpServ.getHeaders()
        options.params = this.httpServ.setHttpParams()
        options['body'] = { sheet: sheet }
        return this.http.delete<boolean>('/restful/sheet/delete', options)
    }

    /**
     * saveRate
     */
    public saveRate(form: any): Observable<any> {
        let options = this.httpServ.optionsRequest
        options.params = this.httpServ.setHttpParams()
        options['responseType'] = 'json'
        return this.http.post<any>('/restful/sheet/rating', form, options)
    }

    /**
     * get Rating by Sheet
     */
    public getRatingbySheet(sheet: string): Observable<number> {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'json'
        options.params = this.httpServ.setHttpParams()
        return this.http.get<number>(`/restful/sheet/rating/${sheet}`, options)
    }



    test(): Observable< object > {
        return Observable.create( observer => {
            try {
                if ( 1 == 1) {
                    throw new Error('another')
                }
                observer.next( { status: true} )
            } catch (ex) {
                observer.error( { status: false, raise: ex} )
            }
            observer.complete()
        })
    }

}
