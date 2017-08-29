import { Router } from 'express';


import { AuthUrls } from './auth.routes';
import { SheetUrls } from './sheet.routes';
import { brandUrls } from './brand.route';
import { modelUrls } from './model.route';


const urls: Router = Router();

urls.use('/auth', AuthUrls)
urls.use('/sheet', SheetUrls)
urls.use('/brand', brandUrls)
urls.use('/model', modelUrls)

export { urls };
