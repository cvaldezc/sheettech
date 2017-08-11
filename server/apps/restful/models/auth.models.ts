import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const AuthSchema = new mongoose.Schema({
    auth: { type: String, unique: true, trim: true },
    email: { type: String, trim: true },
    avatar: { type: String },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: { type: Date },
    permission: {
        write: { type: Boolean, default: false },
        reader: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
    },
    isactive: { type: Boolean, default: true }
});

AuthSchema.methods.gravatar = () => {
    if (!this.email) {
        return 'https://gravatar.com/avatar/?s=200&d=retro';
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

const Auth = mongoose.model('Auth', AuthSchema);

export { Auth };
