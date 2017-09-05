import { Document, Model, model, Schema } from 'mongoose';

import { IBrand } from '../interfaces/Brand.inteface';


const BrandSchema: Schema = new Schema({
    bid: { type: String, unique: true, maxlength: 5 },
    brand: { type: String, trim: true },
    register: { type: Date, default: Date.now() }
})

export interface IBrandDocument extends IBrand, Document {
    _id: string
 }

export const Brand: Model<IBrandDocument> = model<IBrandDocument>('Brand', BrandSchema)
