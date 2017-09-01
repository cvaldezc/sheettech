import { Injectable } from '@angular/core';
// import {
//     Headers,
//     ResponseContentType,
//     RequestOptions,
//     RequestOptionsArgs
//  } from '@angular/http';
import {
    HttpHeaders,
    // HttpHeaderResponse,
    HttpParams,
    // HttpParameterCodec
    HttpResponse
    } from '@angular/common/http';


@Injectable()
export class HttpServices {

    public token: string = '';
    public parameters: HttpParams = new HttpParams();

    public optionsRequest = {
        headers: null,
        params: new HttpParams()
    };

    constructor() {
        this.optionsRequest = {
            headers: this.getHeaders(),
            params: new HttpParams()
        };
    }

    /**
     * set
     */
    public getHeaders(): HttpHeaders {
        let headers: any = null;
        headers = new HttpHeaders(
            {
                'authorization': `${localStorage.getItem('token') || ''}`,
                'Content-Type': '*/*',
                'description': ''
            }
        );
        return headers;
    }

}
