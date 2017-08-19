import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
// import { NextObserver } from 'rxjs/Observer';
import { NotificationsService } from 'angular2-notifications';

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
    private servicePermission: PermissionService,
    private notity: NotificationsService) { }

  permission: IPermission = {
    reader: false,
    write: false,
    delete: false
  };

  ngOnInit(): void {
    this.getPermission();
  }

  private getPermission() {
    let auth = this.route.snapshot.params['auth']
    this.servicePermission.getAuth(auth)
      .subscribe(
        (observer) => {
          console.log(observer);
          if (!observer.hasOwnProperty('status')) {
            // this.permission = observer;
            console.table(this.permission)
          } else {
            console.log('OBSERVER', observer);
            this.notity.alert('Alerta!', `${observer}`);
          }
        },
        err => {
          this.notity.error('Error', err);
          console.log('ERR ', err);
        }
      )
  }

  test(): void {
    console.log(this.permission);
  }

}
