import { IPermission } from './Permission.interface';

export interface IAuthModel extends IPermission {
    auth: string;
    email: string;
    avatar: string;
    signupDate?: Date;
    lastLogin?: Date;
    permission: IPermission;
    charge: string;
    isactive: boolean;
}
