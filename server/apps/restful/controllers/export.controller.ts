import { Response, Request } from 'express'
import fs = require('fs-extra')
import os = require('os')
import path = require('path')
import xlsx = require('xlsx')

import { config } from '../../../config.server'


export class ExportController {


    /**
     * importFile
     * @param {File} file format xlsx | json
     * @desc write file upload in the server
     * @author @cvaldezch
     * @returns {boolean|object}
     * @date 2017-09-19 16:58:42
     */
    public importFile(req: Request, res: Response) {
        if (req.hasOwnProperty('files')) {
            const key: number = Date.now()
            let binary: any = req.files.file
            let dir: string = path.join(config.SOURCE_LIBRARY, 'tmp', `${key}`)
            if (!fs.existsSync(dir)) {
                fs.mkdirsSync(dir)
            }
            let pahtSource: string = path.join(dir, `source${path.extname(binary.name)}`)
            binary.mv(pahtSource, (err) => {
                if (err)
                    return res.status(500).json(false)
                res.status(202).json({ status: true, ukey: key })
            })
        } else {
            res.status(501).json(false)
        }
    }

    /**
     * readSource
     * @param {string} keysource
     * @desc read file and verify format. If file is xlsx write in format json
     * @author @cvaldezch
     * @returns {boolean}
     * @date 2017-09-19 17:39:56
     */
    public readSource(req: Request, res: Response) {

    }

    /**
     * findSheetsByJSON
     * @param {string} keysource
     * @desc find sheet in the db and write dirsheet if exist
     * @author @cvaldezch
     * @returns {boolean|object} the object are sheet not found in the db
     * @date 2017-09-19 17:43:13
     */
    public findSheetsByJSON(req: Request, res: Response) {

    }

    /**
     * copySource
     * @param {string} keysource
     * @desc copy and sheet at folder tmp
     * @author @cvaldezch
     * @returns {boolean}
     * @date 2017-09-19 17:44:24
     */
    public copySource(req: Request, res: Response) {

    }

    /**
     * makeFileDownload
     * @param {string} keysource
     * @desc make file zip or merged all sheet in format pdf
     * @author @cvaldezch
     * @returns {boolean}
     * @date 2017-09-19 17:46:20
     */
    public makeFileDownload(req: Request, res: Response) {

    }


}
