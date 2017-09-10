import { Document, Model, model, Schema, Types } from 'mongoose';

import { IFavorite } from '../interfaces/Favorite.interface'


export interface IFavoriteModel extends IFavorite, Document { }

const FavoriteSchema: Schema = new Schema({
    auth: { type:  Schema.Types.ObjectId, ref: 'Auth', unique: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Sheet' }]
})

export const Favorite: Model<IFavoriteModel> = model<IFavoriteModel>('Favorite', FavoriteSchema)
