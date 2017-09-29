import { Response, Request } from 'express'
import fs = require('fs-extra')
import os = require('os')
import path = require('path')
import xlsx = require('xlsx')
import zip = require('zip-folder')
import pdfmerge = require('pdf-merge')

import { config } from '../../../config.server'
import { Sheet } from '../models/sheet.models'
import { BrandController } from '../controllers/brand.controller'
import { ModelController } from '../controllers/model.controller'



export class ExportController {


    /**
     * removeTmpUKey
     */
    public removeTmpUKey(req: Request, res: Response) {
        if (req.body.hasOwnProperty('ukey')) {
            try {
                let tmp: string = path.join(config.SOURCE_LIBRARY, 'tmp', `${req.body.ukey}`)
                fs.remove(tmp, (err) => {
                    if (err)
                        return res.status(501).json({ raise: err })
                    res.status(200).json(true)
                })
            } catch (error) {
                res.status(500).json({ raise: error })
            }
        } else {
            res.status(500).json({ raise: 'key not found' })
        }
    }

    /**
     * removeAllTmp
     */
    public removeAllTmp(req: Request, res: Response) {
        let tmp: string = path.join(config.SOURCE_LIBRARY, 'tmp')
        fs.remove(tmp, (err) => {
            if (err)
                return res.status(501).json({ raise: err })
            fs.mkdir(tmp)
            res.status(200).json(true)
        })
    }


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
            let pathSource: string = path.join(dir, `source${path.extname(binary.name)}`)
            binary.mv(pathSource, (err) => {
                if (err)
                    return res.status(500).json(false)
                fs.chmodSync(pathSource, 0o777)
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
                    for (var x = 1; x <= range.e.r; x++) {
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
                        fs.writeJSON(path.join(dir, 'postsource.json'), pjson, { encoding: 'utf8', mode: 0o777 }, (err) => {
                            if (err)
                                return res.status(500).json({ raise: err })
                            res.status(201).json(true)
                        })
                    } else {
                        res.status(501).json({ raise: 'EL formato del archivo es invalido' })
                    }
                } else if (path.extname(filename) === '.json') {
                    let objar: Array<Object> = fs.readJsonSync(filename, { encoding: 'utf8' })
                    let fjson: Array<Object> = []
                    objar.forEach((obj, index) => {
                        if (obj.hasOwnProperty('idm') && obj.hasOwnProperty('bid') && obj.hasOwnProperty('mid')) {
                            fjson.push({
                                idm: obj['idm'],
                                name: obj['name'],
                                brand: obj['brand'],
                                bid: obj['bid'],
                                pattern: obj['pattern'],
                                mid: obj['mid']
                            })
                        }
                    })
                    if (fjson.length) {
                        fs.writeJsonSync(path.join(dir, 'postsource.json'), fjson, { encoding: 'utf8', mode: 0o777 })
                        res.status(201).json(true)
                    } else {
                        res.status(500).json({ raise: 'Formato invalido' })
                    }
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
    public async findSheetsByJSON(req: Request, res: Response) {
        console.log(req.body);
        if ( req.body.hasOwnProperty('ukey') ) {
            let dir: string = await path.join(config.SOURCE_LIBRARY, 'tmp', `${req.body.ukey}`)
            let filename: string = await path.join(dir, 'postsource.json')
            let bjson: Array<Object> = await fs.readJsonSync(filename, { encoding: 'utf8' })
            let process: Array<Object> = [],
                notfound: Array<Object> = []
            console.log(dir)
            console.log(filename)
            console.log(bjson)
            console.log('----------------------------')
            if (bjson.length) {
                for (const obj of bjson) {
                    let _brand: any = null,
                        _pattern: any  = null,
                        _sheet: any = null
                    try {
                        await new BrandController().findByBID(obj['bid']).then( (res) => _brand = res).catch(err => console.log('ERROR', err))
                        console.log('brand', obj['bid'], _brand)
                        await new ModelController().findByPID(obj['mid']).then( res => _pattern = res).catch( err => console.log(err))
                        console.log('pattern', obj['mid'], _pattern)
                        _sheet = await Sheet.findOne({ sheet: obj['idm'], brand: _brand['_id'] || '', pattern: _pattern['_id'] || ''}, (err, res) => res)
                        if (typeof _sheet == 'object') {
                            console.log(_sheet.dirsheet)
                            obj['b_id'] = _brand
                            obj['p_id'] = _pattern
                            obj['s_id'] = _sheet._id
                            obj['path'] = _sheet.dirsheet
                            obj['name'] = _sheet.name
                            obj['brand'] = _brand['brand']
                            obj['pattern'] = _pattern['model']
                            process.push(obj)
                        } else {
                            notfound.push(obj)
                        }
                    } catch (error) {
                        console.log('Occurret an error')
                    }
                }
                // create file with data process
                if (process.length)
                    await fs.writeJSONSync(path.join(dir, 'process.json'), process, { encoding: 'utf8', mode: 0o777 })

                // bjson.forEach(async (_sobj) => {
                //     let _brand: string = null
                //     let _pattern: string  = null
                //     await new BrandController().findByBID(_sobj['bid']).subscribe(async (res) => await console.log(res))
                //     new ModelController().findByPID(_sobj['mid']).then(async (res) => _pattern = await res)
                //     console.log('brand', _sobj['bid'], _brand)
                //     console.log('pattern', _sobj['mid'], _pattern)
                //     // Sheet.findOne({ sheet: _sobj['idm'], brand: _brand})
                // })
                res.status(200).json({status: true, notfound: notfound, process: process.length })
            } else {
                res.status(500).json({ raise: 'Not found object' })
            }
        } else {
            res.status(500).json({ raise: 'key not found' })
        }
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
        if (req.body.hasOwnProperty('ukey')) {
            try {
                let dir: string = path.join(config.SOURCE_LIBRARY, 'tmp', `${req.body.ukey}`),
                    filename: string = path.join(dir, 'process.json'),
                    bjson: Array<Object> = []
                // console.log(fs.pathExistsSync(path.join(dir, 'origin')))
                if (!fs.pathExistsSync(path.join(dir, 'origin'))) {
                    fs.mkdirSync(path.join(dir, 'origin'), 0o777)
                }

                bjson = fs.readJsonSync(filename, { encoding: 'utf8' })
                if (bjson.length) {
                    for (let obj of bjson) {
                        let origin: string = path.join(dir, 'origin', `${obj['idm']}-${obj['name']}-${obj['brand']}-${obj['pattern']}.pdf`.replace(/[\%|\"|\Ñ|\ñ|\$|\#|\/]/gi, ''))
                        origin = origin.replace(/(\ ){1,}/g, '_')
                        console.log(origin)
                        fs.copySync(obj['path'], origin, { overwrite: true, errorOnExist: false })
                        fs.chmodSync(origin, 0o777)
                        // console.log(obj['path'])
                    }
                    res.status(202).json(true)
                } else {
                    new Error('Nothing data')
                }
            } catch (error) {
                res.status(500).json({ raise: 'error occurrent ' + error })
            }

        } else {
            res.status(501).json({ raise: 'key not found' })
        }
    }

    /**
     * makeFileDownload
     * @param {string} ukey
     * @param {number} type
     * @desc make file zip or merged all sheet in format pdf
     * @author @cvaldezch
     * @returns {boolean}
     * @date 2017-09-19 17:46:20
     */
    public async makeFileDownload(req: Request, res: Response) {
        try {
            if (req.body.hasOwnProperty('ukey')) {
                let dir: string = await path.join(config.SOURCE_LIBRARY, 'tmp',`${req.body.ukey}`),
                    files: Array<string> = await fs.readdirSync(path.join(dir, 'origin')),
                    zipname: string = ''
                if (req.body.type == 0) {
                    zip(path.join(dir, 'origin'), path.join(dir, `${req.body.ukey}.zip`), (err) => {
                        if (err) {
                            console.log(' Err in create zip ', err)
                            res.status(500).json({ raise: err })
                        } else {
                            console.log('EXCELENTE!')
                            return res.status(202).download(path.join(dir, `${req.body.ukey}.zip`))
                        }
                    })
                    // let nzip = new zip()
                    // nzip.addLocalFolder(path.join(dir, 'origin'))
                    // files = await files.map((file) => path.join(dir, 'origin', file))
                    // await files.forEach((file) => {
                    //     nzip.file(path.basename(file), fs.readFileSync(file))
                    // //    nzip.addLocalFile(`${file}`, `${req.body.ukey}`)
                    //    //nzip.addFile(path.basename(file), fs.readFileSync(file), '', 0o644 << 16)
                    // })
                    // zipname = path.join(dir, `${req.body.ukey}.zip`)
                    // await nzip.writeZip(zipname)
                    // res.send(await nzip.generate({base64:false,compression:'DEFLATE'}))
                    // res.end()
                } else if (req.body.type == 1) {
                    this.getFiles(files, dir)
                        .then(arrf => {
                            console.log(arrf)
                            pdfmerge(arrf) //, { output: path.join(dir, `${req.body.ukey}.pdf`) }
                                .then( buffer => {
                                    res.status(202)
                                    res.send(buffer)
                                    res.end()
                                })
                                .catch(err => console.log("error pdfmerge", err))
                        })
                }
            } else {
                res.status(501).json({ raise: 'key not found' })
            }
        } catch (error) {
            res.status(501).json({ raise: error })
        }
    }

    private async getFiles(base: Array<string>, dir: string) {
        let preFiles: Array<string> = []
        await base.forEach(async (file) => {
            preFiles.push(await path.join(dir, 'origin', file))
        })
        return await preFiles
    }


    /**
     * downloadFormat
     */
    public downloadFormat(req: Request, res: Response) {
        res.status(200).download(path.join(config.SOURCE_LIBRARY, 'statics', 'FS-DOSSIER.xlsx'))
    }


}
