import { Router } from 'express'

import { AuthUrls } from './auth.routes'
import { sheetUrls } from './sheet.routes'
import { brandUrls } from './brand.route'
import { modelUrls } from './model.route'
import { masterUrls } from './master.router'
import { reviewsUrls } from './reviews.route'
import { isAuth } from '../restful/middlewares/auth.middleware'
import { ExportController } from '../restful/controllers/export.controller'

const urls: Router = Router();

urls.use('/auth', AuthUrls)
urls.use('/sheet', sheetUrls)
urls.use('/brand', brandUrls)
urls.use('/model', modelUrls)
urls.use('/master', masterUrls)
urls.use('/reviews', reviewsUrls)

urls.post('/import', isAuth, new ExportController().importFile)

export { urls }
