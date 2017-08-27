import { IBrand } from './Brand.inteface';
import { IModel } from './Model.interface';
import { IAuthModel } from './Auth.interface';

export interface ISheet {
    sid: string,
    names: string,
    dirsheet: string,
    brand: IBrand,
    model: IModel,
    register: number|string|Date,
    rate: number,
    auth: IAuthModel
}