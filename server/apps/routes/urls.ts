import { Router } from 'express';


import { AuthUrls } from './auth.routes';
import { SheetUrls } from './sheet.routes';
import { brandUrls } from './brand.route';


const urls: Router = Router();

urls.use('/auth', AuthUrls)
urls.use('/sheet', SheetUrls)
urls.use('/brand', brandUrls)

export { urls };
