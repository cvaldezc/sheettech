import { Document, Model, model, Schema } from 'mongoose';

import { IModel } from '../interfaces/Model.interface';


const ModelSchema = new Schema({
    mid: { type: String, unique: true, maxlength: 5 },
    model: { type: String, trim: true },
    register: { type: Date, default: Date.now() }
})

// export interface IModelDocument extends IModel, Document {
//     _id: string,
//     model: string
//  }

export const Models = model('Model', ModelSchema)
