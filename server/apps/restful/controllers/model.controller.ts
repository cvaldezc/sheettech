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

    /**
     * getLocalModels
     */
    public getLocalModels(req: Request, res: Response) {
        try {
            Models.find((err, _models) => {
                if (err) return res.status(500).json({ raise: err })
                if (!_models) return res.status(404).json({ raise: 'not found' })

                res.status(200).json(_models)
            })
        } catch (error) {
            res.status(501).json({ raise: error })
        }
    }

    /**
     * create Brand
     */
    public async createModel(req: Request, res: Response) {
        try {
            let _md: any
            let md:any = new Models()
            if (req.body.hasOwnProperty('pid')) {
                md.mid = req.body.pid
                md.model = req.body.pattern
            } else {
                md.mid = req.body.model
                md.model = req.body.mname
            }
            _md = await md.save(async (err, _model) => _model)
            return await _md
        } catch (error) {
            return await { 'raise': error }
        }
    }

    /**
     * findByPID
     */
    public async findByPID(pattern: string): Promise<string> {
        let _fpattern: any = ''
        try {
            _fpattern = await Models.findOne({ mid: pattern }, (err, pattern) => pattern)
            if (typeof _fpattern == 'object')
                _fpattern = _fpattern
        } catch (error) {
            _fpattern = ''
        }
        return await _fpattern
    }

}