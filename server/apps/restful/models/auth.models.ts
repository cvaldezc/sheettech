import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import { config } from '../../../config.server';

const AuthSchema = new mongoose.Schema({
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
    isactive: { type: Boolean, default: true }
});

AuthSchema.methods.gravatar = () => {
    if (!this.email) {
        return 'https://gravatar.com/avatar/?s=200&d=retro';
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

// AuthSchema.methods.verifyPassword = (auth: any | object) => {
//     // tslint:disable-next-line:prefer-const
//     let verify = new Promise( (resolve, reject) => {
//         try {
//             fetch(`${config.servicesAuth}wjson/auth`, {
//                 method: 'get',
//                 body: auth
//             })
//             .then( res => res.json())
//             .then( response => {
//                 console.log(response);
//             }).catch( err => {
//                 reject({
//                     code: 406,
//                     status: false,
//                     raise: err
//                 });
//                 console.log(err);
//             });
//         } catch (error) {
//             reject({
//                 code: 500,
//                 status: false,
//                 raise: error
//             });
//         }
//     });
//     return verify;
// };

const Auth = mongoose.model('Auth', AuthSchema);

export { Auth };
