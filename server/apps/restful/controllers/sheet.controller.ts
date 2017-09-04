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
            console.log('RESULT BRAND ', brand);
            console.log('RESULT MODEL ', model);
            Sheet.findOne({ sheet: req.body.sheet, brand: brand._id, pattern: model._id })
                // .populate({ path: 'brand', match: { bid: brand.bid }})
                // .populate({ path: 'pattern', match: { mid: model.mid }})
            , async (err, _sheet) => {
                console.log('RESULT BY POPULATE ', _sheet)
                if (err)
                    res.status(505).json({ raise: err })
                if (!_sheet) {
                    console.log('result brand ', brand)
                    console.log('result model ', model)
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
