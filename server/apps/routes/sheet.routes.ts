import { Router } from 'express'

import { SheetController } from '../restful/controllers/sheet.controller'
import { FavoriteController } from '../restful/controllers/favorite.controller';
import { isAuth } from '../restful/middlewares/auth.middleware'


const sheetUrls = Router();


// get by id
sheetUrls.post('/encode/:sheet', isAuth, new SheetController().getById)
// finds sheets
sheetUrls.get('/finds', new SheetController().finds);
// post save sheet in library
sheetUrls.post('/save', isAuth, new SheetController().saveSheet)
// update sheet
sheetUrls.put('/update', isAuth, new SheetController().updateSheet)
// remove sheet and file
sheetUrls.delete('/delete', isAuth, new SheetController().removeSheet)
// get sheets related
sheetUrls.get('/related', isAuth, new SheetController().sheetRelated)
// set rating by sheet
sheetUrls.post('/rating', isAuth, new SheetController().saveRate)
// get attachment by id
sheetUrls.get('/attachment/:sheet', new SheetController().getAttachmentById)
// get rating by id
sheetUrls.get('/rating/:sheet', new SheetController().getRatingBySheet)
// checked sheet favorite
sheetUrls.get('/favorite/:auth/:sheet', isAuth, new FavoriteController().verifyFavorite)
// save Favorite
sheetUrls.post('/save/favorite', isAuth, new FavoriteController().saveFavorite)
// remove sheet from list favorites by user
sheetUrls.post('/remove/favorite', isAuth, new FavoriteController().removeFavorite)

export { sheetUrls }
