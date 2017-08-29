import { Request, Response } from 'express';
import fetch from 'node-fetch'

import { config } from '../../../config.server';
import { IMaster } from '../interfaces/Master.interface';


export class MasterController {

    /**
     * findCode
     */
    public findCode(req: Request, res: Response) {
        let code: string = req.params.code
        if ( code != '') {
            fetch(`${config.remoteservice}services/?codemaster=true&code=${code}&type=MT`,
            {
                method: 'GET',
                compress: true
            })
            .then(res => res.json())
            .then(response => {
                res.status(200).json(response)
            })
            .catch( reason => {
                res.status(500).json({ raise: reason })
            })
        }else{
            res.status(404).json({ raise: 'Error en el Codigo' })
        }
    }

    /**
     * findName
     */
    public findName(req: Request, res: Response) {
        let name: string = req.params.name
        if ( name != '') {
            try {
                fetch(
                    `${config.remoteservice}services/?namemaster=true&name=${name}&type=MT`,
                {
                    method: 'GET',
                    compress: true
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
        }else{
            res.status(404).json({ raise: 'Error en el nombre' })
        }
    }

}