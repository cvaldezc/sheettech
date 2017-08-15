import { Injectable } from '@angular/core';
import {
    Headers,
    ResponseContentType,
    RequestOptions
 } from '@angular/http';


@Injectable()
export class HttpServices {

    private token = localStorage.getItem('auth_token');

    private headers = new Headers({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    });

    public optionsHeaders = new RequestOptions({
        headers: this.headers,
        responseType: ResponseContentType.Json
    });

}
