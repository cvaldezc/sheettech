import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { IMaster } from '../../../../server/apps/restful/interfaces/Master.interface';
import { MasterService } from '../../services/master.service';


@Component({
    selector: 'dialog-material',
    templateUrl: './master-remote.component.html'
})
export class DialogMaterial {

    masterList: Observable<Array<IMaster>>
    process: boolean = false

    constructor(
        public dialogRef: MdDialogRef<DialogMaterial>,
        private masterServ: MasterService) {
        }

    findCode(event: KeyboardEvent, code: string): void {
        if (event.keyCode === 13) {
            this.masterList = this.masterServ.findRemoteCode(code)
        }
    }

    findName(event: KeyboardEvent, name: string): void {
        if (event.keyCode === 13) {
            this.masterList = this.masterServ.findRemoteNames(name)
        }
    }

}