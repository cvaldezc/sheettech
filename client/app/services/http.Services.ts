import { Injectable } from '@angular/core';
// import {
//     Headers,
//     ResponseContentType,
//     RequestOptions,
//     RequestOptionsArgs
//  } from '@angular/http';
import {
    // HttpClient,
    HttpHeaders,
    // HttpHeaderResponse,
    HttpParams,
    // HttpParameterCodec
    HttpResponse
    } from '@angular/common/http';


@Injectable()
export class HttpServices {

    public token: string = localStorage.getItem('auth_token');
    private headers: HttpHeaders = new HttpHeaders(
        {
            'authorization': this.token || '',
            'Content-Type': 'application/json',
            'description': ''
        }
    );
    // private httpParams: HttpParams = new HttpParams();
    public optionsRequest = {
        headers: this.headers,
        params: new HttpParams()
    };

    /**
     * object older
     */
    // private headers = new Headers({
    //     'Authorization': `Bearer ${this.token}`,
    //     'Content-Type': 'application/json',
    //     'charset': 'UTF-8'
    // });

    // public optionsHeaders = new RequestOptions({
    //     headers: this.headers,
    //     responseType: ResponseContentType.Json
    // });

    // public optionsArgs: RequestOptionsArgs = {
    //     responseType: ResponseContentType.Json,
    //     params: {},
    // }

}
