import { IPermission } from './Permission.interface';

export interface IAuthModel {
    auth: string;
    email: string;
    avatar: string;
    name: string,
    signupDate: string;
    lastLogin: string;
    permission: IPermission;
    charge: string;
    isactive: boolean;
}
