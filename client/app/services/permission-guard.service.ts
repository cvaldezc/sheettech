import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TokenService } from './token.service';
import { IPermission } from '../../../server/apps/restful/interfaces/Permission.interface';


@Injectable()
export class PermissionGuard extends TokenService {

    public decodePermission(): Observable<IPermission> {
        return Observable.create(
            observer => {
                this.decodedTokenLocal('permission')
                   .subscribe((value: any) => {
                       observer.next(value.payload)
                       observer.complete()
                       })
            })
    }

}
