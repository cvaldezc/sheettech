import { Request, Response } from 'express';

import { Sheet } from '../models/sheet.models';
import { ISheet } from '../interfaces/Sheet.interface';

import { tmpdir } from 'os';


export class SheetController {

    /**
     * saveSheet
     */
    public saveSheet(req: Request, res: Response) {
        console.log(tmpdir());
        console.log(req.files);
        try {
            res.status(200).json({raise: 'nothing'})
        } catch (error) {
            res.status(501).send(error)
        }
    }

}
