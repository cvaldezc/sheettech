import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserModels } from '../models/user.models';

@Injectable()
export class UserServices {

    private headers = new Headers({
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    });
    private optionsheaders = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getUsers(): Observable<UserModels[]> {
        return this.http.get('/api/users').map( response => response.json());
    }

}
