import { Injectable } from '@angular/core'
import { HttpEvent, HttpRequest, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'

import { HttpServices } from '../http.Services'


@Injectable()
export class ExportService {

    constructor(
        private hSevr: HttpServices,
        private http: HttpClient
    ) {  }


    /**
     * eraseTMP
     */
    public eraseTMP(): Observable<boolean> {
        let options = this.hSevr.optionsRequest
        options.headers = this.hSevr.getHeaders()
        options.params = this.hSevr.setHttpParams()
        options.responseType = 'json'
        return this.http.post<boolean>('/restful/export/erase', {}, options)
    }

    /**
     * removeUKey
     * @param {string} ukey
     * @returns {boolean}
     */
    public removeUKey(ukey: string): Observable<boolean> {
        let options = this.hSevr.optionsRequest
        options.headers = this.hSevr.getHeaders()
        options.params = this.hSevr.setHttpParams()
        options.responseType = 'json'
        return this.http.post<boolean>('/restful/export/remove', { ukey: ukey }, options)
    }

    /**
     * importFile
     * @param file
     * @return {boolean|object} status upload file -> object content ukey
     * @desc callback rest write file upload in the server as source.ext
     */
    public importFile(form: FormData): Observable<HttpEvent<{}>> {
        let options = this.hSevr.optionsRequest
        options.params = this.hSevr.setHttpParams()
        options.responseType = 'json'
        options['reportProgress'] = true
        options.headers = this.hSevr.getHeaders().delete('Content-Type')
        return this.http.request(new HttpRequest('POST', '/restful/import', form, options))
    }

    /**
     * readerSource
     * @param {string} ukey
     * @return {boolean|object}
     * @desc callback rest reader file source and validate and write preview.json
     */
    public readerSource(ukey: string): Observable<boolean|object> {
        let options = this.hSevr.optionsRequest
        options.headers = this.hSevr.getHeaders()
        options.params = this.hSevr.setHttpParams()
        options.responseType = 'json'
        return this.http.post<boolean|object>('/restful/export/reader', { ukey: ukey }, options)
    }

    /**
     * findPathSheets
     * @param {string} ukey
     * @return {object}
     * @desc callback rest for find in the db all path sheet availables and write process.json include all path sheet
     */
    public findPathSheets(ukey: string): Observable<object> {
        let options = this.hSevr.optionsRequest
        options.headers = this.hSevr.getHeaders()
        options.params = this.hSevr.setHttpParams()
        options.responseType = 'json'
        return this.http.post<object>('/restful/export/find/path', { ukey: ukey }, options)
    }

    /**
     * processCopy
     * @param {string} ukey
     * @return {object}
     * @desc callback rest for copy all files availables in process.json
     */
    public processCopy(ukey: string): Observable<object> {
        let options = this.hSevr.optionsRequest
        options.headers = this.hSevr.getHeaders()
        options.params = this.hSevr.setHttpParams()
        options.responseType = 'json'
        return this.http.post<object>('/restful/export/copy/files', { ukey: ukey }, options)
    }

    /**
     * makeFileDown
     * @param {string} ukey
     * @param {number} type values (0=>zip) or (1=>merged pdf)
     * @return {blob}
     * @desc callback rest for make file zip or merged sheet in unique file pdf
     */
    public makeFileDown(ukey: string, type: number): Observable<Blob> {
        let options = this.hSevr.optionsRequest
        options.headers = this.hSevr.getHeaders()
        options.params = this.hSevr.setHttpParams()
        options.responseType = 'blob'
        return this.http.post<Blob>('/restful/export/dossier', { ukey: ukey, type: type }, options)
    }



}
