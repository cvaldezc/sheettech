import { Document, Model, model, Schema, Types } from 'mongoose';
import { IReviews } from '../interfaces/Reviews.interface';


export interface IReviewsModel extends IReviews, Document { }

const reviewsSchema: Schema = new Schema({
    auth: { type: Types.ObjectId, ref: 'Auth' },
    sheet: { type: Types.ObjectId, ref: 'Sheet' },
    comment: { type: String, trim: true, default: '' },
    register: { type: Date, default: Date.now() }
})

export const Reviews: Model<IReviewsModel> = model<IReviewsModel>('Reviews', reviewsSchema)
