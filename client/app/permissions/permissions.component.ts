import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
// import { NextObserver } from 'rxjs/Observer';
import { NotificationsService } from 'angular2-notifications';

import { IAuthModel } from '../../../server/apps/restful/interfaces/Auth.interface';
import { IPermission } from '../../../server/apps/restful/interfaces/Permission.interface';
import { PermissionService } from '../services/main/permission.service';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.sass']
})
export class PermissionsComponent implements OnInit {

  gAuth: IAuthModel = {
    auth: '',
    avatar: '',
    charge: '',
    name: '',
    email: '',
    isactive: false,
    lastLogin: '',
    signupDate: '',
    permission: <IPermission>{
      reader: false,
      write: false,
      delete: false
    }
  };

  constructor(
    private route: ActivatedRoute,
    private servicePermission: PermissionService,
    private notity: NotificationsService) { }

  permission: IPermission = {
    reader: false,
    write: false,
    delete: false
  };

  options: object = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  }

  ngOnInit(): void {
    this.getAuth();
  }

  private getAuth() {
    let auth = this.route.snapshot.params['auth']

    this.servicePermission.getAuth(auth)
      .subscribe(
        (observer: IAuthModel) => {
          // console.log(observer);
          if (!observer.hasOwnProperty('status')) {
            this.gAuth = observer;
            this.permission = observer.permission;
            // console.log(this.permission)
            // console.table(observer)
          } else {
            // console.log('OBSERVER', observer);
            this.notity.alert('Alerta!', `${observer}`);
          }
        },
        err => {
          // console.log('ERR ', err);
          this.notity.error('Error', err.error.raise);
        }
      )
  }

  test(): void {
    console.log(this.permission);
  }

}
