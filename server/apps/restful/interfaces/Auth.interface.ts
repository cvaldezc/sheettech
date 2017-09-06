import { IPermission } from './Permission.interface';

export interface IAuthModel {
    auth: string;
    email: string;
    avatar?: string;
    name: string,
    signupDate?: number|string|Date;
    lastLogin?: number|string|Date;
    permission?: IPermission;
    charge?: string;
    isactive: boolean;
}
