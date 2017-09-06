import { Router } from 'express'

import { SheetController } from '../restful/controllers/sheet.controller'
import { isAuth } from '../restful/middlewares/auth.middleware'


const sheetUrls = Router();


// get by id
sheetUrls.post('/:sheet', isAuth, new SheetController().getById)
// finds sheets
sheetUrls.get('/finds', new SheetController().finds);
// post save sheet in library
sheetUrls.post('/save', isAuth, new SheetController().saveSheet)
// get attachment by id
sheetUrls.get('/attachment/:sheet', new SheetController().getAttachmentById)
// get sheets related
sheetUrls.get('/related', isAuth, new SheetController().sheetRelated)

export { sheetUrls };
