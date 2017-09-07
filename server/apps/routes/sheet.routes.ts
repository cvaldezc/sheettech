import { Router } from 'express'

import { SheetController } from '../restful/controllers/sheet.controller'
import { isAuth } from '../restful/middlewares/auth.middleware'


const sheetUrls = Router();


// get by id
sheetUrls.post('/encode/:sheet', isAuth, new SheetController().getById)
// finds sheets
sheetUrls.get('/finds', new SheetController().finds);
// post save sheet in library
sheetUrls.post('/save', isAuth, new SheetController().saveSheet)
// get sheets related
sheetUrls.get('/related', isAuth, new SheetController().sheetRelated)
// set rating by sheet
sheetUrls.post('/rating', isAuth, new SheetController().saveRate)
// get attachment by id
sheetUrls.get('/attachment/:sheet', new SheetController().getAttachmentById)

export { sheetUrls }
