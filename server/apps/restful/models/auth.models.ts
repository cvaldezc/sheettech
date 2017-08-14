import { Document, Schema, Model, model } from 'mongoose';
import * as crypto from 'crypto';
import { config } from '../../../config.server';

interface IPermission {
    write: boolean;
    reader: boolean;
    delete: boolean;
}

export interface IAuthModel extends Document, IPermission {
    auth: string;
    email: string;
    avatar: string;
    signupDate?: Date;
    lastLogin?: Date;
    permission: IPermission;
    charge: string;
    isactive: boolean;
}

const AuthSchema: Schema = new Schema({
    auth: { type: String, unique: true, trim: true, maxlength: 8 },
    email: { type: String, trim: true },
    avatar: { type: String },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: { type: Date },
    permission: {
        write: { type: Boolean, default: false },
        reader: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
    },
    charge: { type: String },
    isactive: { type: Boolean, default: true }
});

AuthSchema.methods.gravatar = () => {
    if (!this.email) {
        return 'https://gravatar.com/avatar/?s=200&d=retro';
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

const Auth: Model<IAuthModel> = model<IAuthModel>('Auth', AuthSchema);

export { Auth };
