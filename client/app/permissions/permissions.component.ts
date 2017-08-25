import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
// import { NextObserver } from 'rxjs/Observer';
import { NotificationsService } from 'angular2-notifications';

import { IAuthModel } from '../../../server/apps/restful/interfaces/Auth.interface';
import { IPermission } from '../../../server/apps/restful/interfaces/Permission.interface';
import { PermissionService } from '../services/main/permission.service';
import { parseDate } from '../../../server/apps/restful/utils/date.service';
import { TokenService } from "../services/token.service";


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.sass']
})
export class PermissionsComponent implements OnInit {

  gAuth = <IAuthModel>{
    auth: '',
    email: '',
    avatar: '',
    name: '',
    signupDate: Date.now(),
    lastLogin: Date.now(),
    permission: <IPermission>{
      reader: false,
      write: false,
      delete: false
    },
    charge: '',
    isactive: false,
  };

  constructor(
    private route: ActivatedRoute,
    private servPermission: PermissionService,
    private notity: NotificationsService,
    private token: TokenService) { }

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

    this.servPermission.getAuth(auth)
      .subscribe(
        (observer: IAuthModel) => {
          console.log(observer);
          if (!observer.hasOwnProperty('status')) {
            this.gAuth = observer;
            this.permission = observer.permission;
          } else {
            this.notity.alert('Alerta!', `${observer}`);
          }
        },
        err => {
          console.log(err);
          this.notity.error('Error', err.message);
        }
      )
  }

  savePermission(): void {
    this.servPermission.savePermission(this.gAuth.auth, this.permission)
      .subscribe(
        (saved: any) => {
          if (saved.status) {
            this.notity.success('Felicidades!', 'Datos Guardados correctamente')
            this.permission = saved.permission
            this.saveLocalPermission()
          }else{
            this.notity.alert('Alerta!', `${saved.raise}`)
          }
        },
        err => {
          this.notity.error('Alerta!', `${err.error.raise}`)
        }
    )
  }

  saveLocalPermission(): void {
    this.token.decodedTokenLocal().subscribe(
      (observer: any) => {
        if (observer.payload.auth == this.route.snapshot.params['auth']) {
          this.servPermission.encodePermission(this.permission)
            .subscribe( (observer: any) => {
              console.log(observer)
              localStorage.setItem('permission', observer.token)
            })
        }
      }
    )
  }

  test(): void {
    console.log(this.permission);
    console.log(this.servPermission)
  }

}
