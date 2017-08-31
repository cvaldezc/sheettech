import { Router } from 'express';


import { AuthUrls } from './auth.routes';
import { sheetUrls } from './sheet.routes';
import { brandUrls } from './brand.route';
import { modelUrls } from './model.route';
import { masterUrls } from './master.router';

const urls: Router = Router();

urls.use('/auth', AuthUrls)
urls.use('/sheet', sheetUrls)
urls.use('/brand', brandUrls)
urls.use('/model', modelUrls)
urls.use('/master', masterUrls)

export { urls };
