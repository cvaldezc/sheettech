import * as express from 'express';

import { SheetController } from '../restful/controllers/sheet.controllers';


const SheetUrls = express.Router();

SheetUrls.get('/all', new SheetController().getAllDocuments);

export { SheetUrls };
