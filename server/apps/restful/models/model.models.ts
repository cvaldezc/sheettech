import { Document, Model, model, Schema } from 'mongoose';

import { IModel } from '../interfaces/Model.interface';

const ModelSchema = new Schema({
    mid: { type: String, unique: true, maxlength: 5 },
    model: { type: String, trim: true },
    register: { type: Date, default: Date.now() }
})

interface IModelDocument extends Document { }

export const Models: Model<IModelDocument> = model<IModelDocument>('Model', ModelSchema)
