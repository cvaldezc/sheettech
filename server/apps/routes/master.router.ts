import { Router } from 'express';
import { MasterController } from '../restful/controllers/master.controller';


const masterUrls: Router = Router()


// get remote find by code
masterUrls.get('/find/code/:code', new MasterController().findCode)
// get remote find by name
masterUrls.get('/find/name/:name', new MasterController().findName)


export { masterUrls }
