import { Request, Response } from 'express';


import { Sheet } from '../models/sheet.models';
import { ISheet } from '../interfaces/Sheet.interface';
// import { BaseController } from '../services/base.services';
const formidable = require('formidable');
const path = require('path')
const fs = require('fs')

export class SheetController {

    /**
     * saveSheet
     */
    public saveSheet(req: Request, res: Response) {
        console.log(req);
        try {
            res.status(501).send('nothing')
        } catch (error) {
            res.status(501).send(error)
        }
    }

}
