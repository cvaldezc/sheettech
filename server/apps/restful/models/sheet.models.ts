import { Document, Model, model, Schema } from 'mongoose';

import { ISheet } from '../interfaces/Sheet.interface';


const SheetSchema = new Schema({
    sheet: { type: String, trim: true, index: true, required: true, maxlength: 15 },
    name: { type: String, trim: true, required: true, index: true },
    dirsheet: { type: String },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    model: { type: Schema.Types.ObjectId, ref: 'Model' },
    register: { type: Date, default: Date.now() },
    rate: { type: Number, default: 0 },
    auth: { type: Schema.Types.ObjectId, ref: 'Auth' }
})

interface ISheetDocument extends Document { }

export const Sheet: Model<ISheetDocument> = model<ISheetDocument>('Sheet', SheetSchema)
