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
     * @desc write file upload in the server and change name source
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
     * @param {string} ukey
     * @desc read file and verify format. If file is xlsx write postsource json
     * @author @cvaldezch
     * @returns {boolean}
     * @date 2017-09-19 17:39:56
     */
    public readSource(req: Request, res: Response) {
        if (req.body.hasOwnProperty('ukey')) {
            let dir: string = path.join(config.SOURCE_LIBRARY, 'tmp', `${req.body.ukey}`)
            let filename: string = ''
            if (fs.existsSync(path.join(dir, 'source.xlsx'))) {
                filename = path.join(dir, 'source.xlsx')
            } else if (path.join(dir, 'source.json')) {
                filename = path.join(dir, 'source.json')
            }
            if (filename !== '') {
                if (path.extname(filename) === '.xlsx') {
                    let wb: xlsx.WorkBook = xlsx.readFile(filename, { type: 'file' })
                    let ws: xlsx.WorkSheet = wb.Sheets['DOSSIER']
                    let range: xlsx.Range = xlsx.utils.decode_range(ws['!ref'])
                    let pjson: Array<Object> = []
                    console.log(`ROW ${range.e.r} COLUMN ${range.e.c}`)
                    for (var x = 1; x < range.e.r; x++) {
                        let cells: Array<any> = []
                        for (var c = 0; c < 6; c++) {
                            cells.push(ws[xlsx.utils.encode_cell({ c: c, r: x })])
                        }
                        // console.log(cells)
                        if (!cells[0]) continue
                        // if (ws[cell].v != null) {
                        // console.log(cells[0].v)
                        pjson.push({
                            idm: cells[0] ? cells[0].v : '',
                            name: cells[1] ? cells[1].v : '',
                            brand: cells[2] ? cells[2].v : '',
                            bid: cells[3] ? cells[3].v : '',
                            pattern: cells[4] ? cells[4].v : '',
                            mid: cells[5] ? cells[5].v : ''
                        })
                        // }
                    }
                    if (pjson.length) {
                        fs.writeJSONSync(path.join(dir, 'postsource.json'), pjson, { encoding: 'utf8', mode: 0o777 })
                        res.status(201).json(true)
                    } else {
                        res.status(501).json({ raise: 'EL formato del archivo es invalido' })
                    }
                } else if (path.extname(filename) === '.json') {
                    res.status(201).json(true)
                }
            } else {
                res.status(500).json({ raise: 'Archivo fuente invalido' })
            }
        } else {
            res.status(500).json({ raise: 'ukey invalid' })
        }
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
