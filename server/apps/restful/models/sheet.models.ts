import { Document, Model, model, Schema, Types } from 'mongoose';

import { ISheet } from '../interfaces/Sheet.interface';
import { IRate } from '../interfaces/Rate.interface';


const SheetSchema = new Schema({
    sheet: { type: String, trim: true, index: true, required: true, maxlength: 15 },
    name: { type: String, trim: true, required: true, index: true },
    dirsheet: { type: String },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    pattern: { type: Schema.Types.ObjectId, ref: 'Model' },
    register: { type: Date, default: Date.now() },
    rate: [{
        auth: { type: Schema.Types.ObjectId, ref: 'Auth' },
        starOne: { type: Number, default: 0 },
        starTwo: { type: Number, default: 0 },
        starThree: { type: Number, default: 0 },
        starFour: { type: Number, default: 0 },
        starFive: { type: Number, default: 0 }
    }],
    auth: { type: Schema.Types.ObjectId, ref: 'Auth' }
})


export interface ISheetDocument extends ISheet, Document {
    _id: string
 }

export const Sheet: Model<ISheetDocument> = model<ISheetDocument>('Sheet', SheetSchema)

export const setStar = (user: string, star: number): IRate => {
    return <IRate> {
        auth: user,
        starOne: (star == 1 ) ? 1 : 0,
        starTwo: (star == 2 ) ? 1 : 0,
        starThree: (star == 3 ) ? 1 : 0,
        starFour: (star == 4 ) ? 1 : 0,
        starFive: (star == 5 ) ? 1 : 0
    }
}
