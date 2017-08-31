import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { config } from '../../../config.server';
import { IBrand } from '../interfaces/Brand.inteface';
import { Brand } from '../models/brand.models';


export class BrandController {

    /**
     * getRemoteAllBrand
     * get remote all brand
     */
    public getRemoteAllBrand(req: Request, res: Response) {
        try {
            fetch(`${config.remoteservice}services/?getallbrand=true`,
                {
                    method: 'GET',
                })
                .then(res => res.json())
                .then(response => {
                    console.log(response)
                    res.status(200).json(response)
                })
                .catch( reason => {
                    res.status(500).json({ raise: reason })
                })
        } catch (error) {
            res.status(503).json({ raise: error })
        }
    }

}