import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { config } from '../../../config.server';
import { IModel } from '../interfaces/Model.interface';
import { Models } from '../models/model.models';


export class ModelController {

    /**
     * getRemoteAllBrand
     * get remote all brand
     */
    public getRemoteAllModel(req: Request, res: Response) {
        try {
            fetch(`${config.remoteservice}services/?getallmodel=true`,
                {
                    method: 'GET',
                })
                .then(res => res.json())
                .then(response => {
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