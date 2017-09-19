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
     * importFile
     * @param file
     * @return {boolean} status upload file
     */
    public importFile(form: FormData): Observable<HttpEvent<{}>> {
        let options = this.hSevr.optionsRequest
        options.params = this.hSevr.setHttpParams()
        options.responseType = 'json'
        options['reportProgress'] = true
        options.headers = this.hSevr.getHeaders().delete('Content-Type')
        return this.http.request(new HttpRequest('POST', '/restful/import', form, options))
    }

}
