import { Document, Model, model, Schema } from 'mongoose'

import { IReviews } from '../interfaces/Reviews.interface'


export interface IReviewsModel extends IReviews, Document {
    _id: string
}

const reviewsSchema: Schema = new Schema({
    auth: { type: Schema.Types.ObjectId, ref: 'Auth' },
    sheet: { type: Schema.Types.ObjectId, ref: 'Sheet' },
    comment: { type: String, trim: true, default: '' },
    register: { type: Date, default: Date.now() }
})

export const Reviews: Model<IReviewsModel> = model<IReviewsModel>('Reviews', reviewsSchema)
