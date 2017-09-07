import { IBrand } from './Brand.inteface';
import { IModel } from './Model.interface';
import { IAuthModel } from './Auth.interface';
import { IRate } from './Rate.interface';


export interface ISheet {
    sheet: string,
    name: string,
    dirsheet?: string,
    brand: IBrand,
    pattern: IModel,
    register?: number|string|Date,
    rate: Array<IRate>,
    auth: IAuthModel
}