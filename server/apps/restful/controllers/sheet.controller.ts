import { Request, Response } from 'express'
import { DocumentQuery, Types } from 'mongoose';
import path = require('path')
import fs = require('fs')

import { Sheet, ISheetDocument } from '../models/sheet.models'
import { Brand, IBrandDocument } from '../models/brand.models';
import { Models } from '../models/model.models';
import { ISheet } from '../interfaces/Sheet.interface'
import { BrandController } from './brand.controller';
import { ModelController } from './model.controller';
import { config } from '../../../config.server';


export class SheetController {

    /**
     * getId
     * @param _id
     */
    public getAttachmentById(req: Request, res: Response) {
        try {
            console.log(req.params)
            Sheet.findById(req.params.sheet)
                .populate('brand')
                .populate('pattern')
                .exec((err, _sheet) => {
                    if (err)
                        return res.status(501).json({ raise: err })
                    if (!_sheet)
                        return res.status(404).json({ raise: 'sheet not found '})
                    console.log('RESULT FIND', _sheet);

                    // res.set('Content-disposition', `attachment; filename=${_sheet.name} ${_sheet.brand.brand} - ${_sheet.pattern.model}.pdf`)
                    // res.set('Content-Type', 'application/pdf')
                    // res.attachment(_sheet.dirsheet)
                    fs.readFile(_sheet.dirsheet, (serr, data) => {
                        res.contentType('application/pdf')
                        res.send(data)
                    })
                    // res.status(200).download(_sheet.dirsheet, `${_sheet.name} ${_sheet.brand.brand} - ${_sheet.pattern.model}.pdf` )
                })
            // res.status(200).json({ status: true })
        } catch (error) {
            res.status(500).json({ raise: error })
        }
    }


    /**
     * finds sheet by
     * @code string
     * @name string
     * @brand string -> ObjectID
     * @pattern string -> ObjectID
     */
    public finds(req: Request, res: Response) {
        try {
            let _where: object = {}
            Object.keys(req.query).forEach((key) => {
                if (req.query[key]){
                    if (key === 'brand' || key === 'pattern')
                        _where[key] = Types.ObjectId(req.query[key])
                    else if (key === 'name')
                        _where[key] = { $regex: `${req.query[key]}`, $options: 'i'}
                    else
                        _where[key] = req.query[key]
                }
            })
            console.log(_where)
            Sheet.find(_where)
            .populate('brand')
            .populate('pattern')
            .exec((err, _sheets) => {
                if (err)
                    return res.status(500).json({ raise: err })
                if(!_sheets)
                    return res.status(404).json({ raise: 'not found result' })
                res.status(202).json(_sheets)
            })
        } catch (error) {
            res.status(501).json({ raise: error })
        }
    }

    /**
     * saveSheet
     */
    public async saveSheet(req: Request, res: Response) {
        try {
            let brand: any = await Brand.findOne({bid: req.body['brand']}, (err, vbrand) => vbrand)
            let model: any = await Models.findOne({mid: req.body['model']}, (err, vmodel) => vmodel)
            if (brand === null) {
                console.log('create brand');
                brand = await new BrandController().createBrand(req, res)
            }
            if (model === null) {
                console.log('create model');
                model = await new ModelController().createModel(req, res)
            }
            if (brand == null || model == null) {
                return res.status(501).json({ raise: 'marca o modelo no se ha registrado' })
            }
            // console.log('RESULT BRAND ', brand);
            // console.log('RESULT MODEL ', model);
            Sheet.findOne({ sheet: req.body.sheet, brand: brand._id, pattern: model._id })
                // .populate({ path: 'brand', match: { bid: brand.bid }})
                // .populate({ path: 'pattern', match: { mid: model.mid }})
            .populate('brand')
            .populate('pattern')
            .exec( async (err, _sheet) => {
                console.log('RESULT BY POPULATE ', _sheet)
                if (err) return res.status(505).json({ raise: err })
                if (_sheet === null) {
                    // console.log('result brand ', brand)
                    // console.log('result model ', model)
                    let shbinary: any = req.files.file
                    let dirsheet: string = path.join(config.SOURCE_LIBRARY, req.body.sheet)
                    console.log('Exists ', fs.existsSync(dirsheet))
                    if (!fs.existsSync(dirsheet)) {
                        await fs.mkdirSync(dirsheet, '0777')
                    }
                    dirsheet = path.join(dirsheet, `${brand.bid}-${model.mid}${path.extname(shbinary.name)}`)
                    // let name: string = shbinary
                    shbinary.mv(dirsheet, (err) => {
                        if (err)
                            return res.status(503).json({ raise: err })
                        let sheet: ISheetDocument = new Sheet()
                        sheet.sheet = req.body.sheet
                        sheet.name = req.body.name
                        sheet.dirsheet = dirsheet
                        sheet.brand = brand._id
                        sheet.pattern = model._id
                        sheet.auth = req['user']['payload']['user']
                        console.log('request User', req['user'])
                        sheet.save( (err, _st) => {
                            if (err) return res.status(503).json({ raise: 'La hoja no se ha guardado' })

                            res.status(201).json({ status: true })
                        })
                    })
                }else{
                    res.status(409).json({ raise: 'La hoja técnica ya existe' })
                }
            })
        } catch (error) {
            res.status(501).json({raise: error})
        }
    }

}
