import { Router } from 'express';
import { SheetController } from '../restful/controllers/sheet.controller';
import { isAuth } from '../restful/middlewares/auth.middleware';

// import { SheetController } from '../restful/controllers/sheet.controllers';


const sheetUrls = Router();

// SheetUrls.get('/all', new SheetController().getAllDocuments);
// post save sheet in library
sheetUrls.post('/save', isAuth, new SheetController().saveSheet)

export { sheetUrls };
