import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { NextObserver } from 'rxjs/Observer';

import { IPermission } from '../../../server/apps/restful/interfaces/Permission.interface';
import { PermissionService } from '../services/main/permission.service';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.sass']
})
export class PermissionsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private servicePermission: PermissionService) { }

  persmission: IPermission = {
    reader: false,
    write: false,
    delete: false
  };

  ngOnInit(): void {
    let auth = this.route.snapshot.params['auth']
    this.servicePermission.getPermission(auth)
      .subscribe(
        observer => {
          console.log('OBSERVER', observer);
        },
        err => {
          console.log('ERR ', err);
        }
      )
  }

}
