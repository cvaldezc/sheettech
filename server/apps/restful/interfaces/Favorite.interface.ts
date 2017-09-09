import { IAuthModel } from './Auth.interface';
import { ISheet } from './Sheet.interface';


export interface IFavorite {
    auth: IAuthModel
    favorites: Array<ISheet>
}