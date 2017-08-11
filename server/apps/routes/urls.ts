import * as express from 'express';


import { AuthUrls } from './auth.routes';
import { SheetUrls } from './sheet.routes';


const urls = express.Router();

urls.use('/auth', AuthUrls);
urls.use('/sheet', SheetUrls);

export { urls };
