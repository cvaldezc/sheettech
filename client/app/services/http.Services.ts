import { Injectable } from '@angular/core';
import {
    // Headers,
    ResponseContentType,
    // RequestOptions,
    RequestOptionsArgs
 } from '@angular/http';
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
        headers: undefined,
        params: new HttpParams(),
        responseType: undefined
    };

    constructor() {
        this.optionsRequest = {
            headers: this.getHeaders(),
            params: this.setHttpParams(),
            responseType: 'json'
        }
    }

    /**
     * set
     */
    public getHeaders(): HttpHeaders {
        let headers: any = null;
        headers = new HttpHeaders(
            {
                'authorization': `${localStorage.getItem('token') || ''}`,
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Content-Type': 'application/json;charset=utf-8',
                // 'cenvtype': 'multipart/form-data',
                'description': ''
            }
        );
        return headers;
    }

    /**
     * set HttpParams
     */
    public setHttpParams(params?: object|string): HttpParams {
        let _params: HttpParams = new HttpParams()
        if (params && typeof params === 'object') {
            Object.keys(params).forEach( (key, index) => {
                _params = _params.append(key, params[key])
            } )
        }
        return _params
    }

}
