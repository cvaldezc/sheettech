import { Request, Response } from 'express'
import { DocumentQuery, Types } from 'mongoose';
import path = require('path')
import fs = require('fs')
import { UploadedFile } from 'express-fileupload'

import { Sheet, ISheetDocument, setStar } from '../models/sheet.models'
import { Brand, IBrandDocument } from '../models/brand.models';
import { Models } from '../models/model.models';
import { ISheet } from '../interfaces/Sheet.interface'
import { IRate } from '../interfaces/Rate.interface';
import { BrandController } from './brand.controller';
import { ModelController } from './model.controller';
import { config } from '../../../config.server';


export class SheetController {


    /**
     * getById
     */
    public getById(req: Request, res: Response) {
        Sheet
            .findById(req.params.sheet)
            .select({ _id: 0, dirsheet: 0, rate: 0 })
            .populate('brand', { _id: 0, register: 0 }, 'Brand')
            .populate('pattern', { _id: 0, register: 0 }, 'Model')
            .populate('auth', { _id: 0, permission: 0, lastLogin: 0, signupDate: 0 }, 'Auth')
            .exec(async (err, _sheet) => {
                if (err)
                    return res.status(501).json({ raise: err })
                if (!_sheet)
                    return res.status(404).json({ raise: 'sheet not found ' })
                res.status(200).json(_sheet)
            })
    }

    /**
     * getAttachmentById
     * @param _id
     */
    public getAttachmentById(req: Request, res: Response) {
        try {
            // console.log(req.params)
            Sheet.findById(req.params.sheet)
                .select({ rate: 0 })
                .populate('brand', { _id: 0, register: 0 }, 'Brand')
                .populate('pattern', { _id: 0, register: 0 }, 'Model')
                .exec(async (err, _sheet) => {
                    if (err)
                        return res.status(501).json({ raise: err })
                    if (!_sheet)
                        return res.status(404).json({ raise: 'sheet not found ' })
                    // console.log('RESULT FIND', _sheet);
                    // let file = await fs.createReadStream(_sheet.dirsheet)
                    // let stat = await fs.statSync(_sheet.dirsheet)
                    // res.('Content-Length', `${stat.size}`)
                    // res.set('Content-Type', 'application/pdf')
                    // res.set('Content-Disposition', `attachment;filename=${_sheet.name} ${_sheet.brand.brand} ${_sheet.pattern.model}.pdf`)
                    // file.pipe(await res)
                    res.status(200).download(_sheet.dirsheet, `${_sheet.name} ${_sheet.brand.brand} - ${_sheet.pattern.model}.pdf`)
                    // res.end()
                })
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
                if (req.query[key]) {
                    if (key === 'brand' || key === 'pattern')
                        _where[key] = Types.ObjectId(req.query[key])
                    else if (key === 'name')
                        _where[key] = { $regex: `${req.query[key]}`, $options: 'i' }
                    else
                        _where[key] = req.query[key]
                }
            })
            // console.log(_where)
            Sheet
                .find(_where)
                .select({ register: 0, dirsheet: 0, rate: 0 })
                .populate('brand', { _id: 0, register: 0 }, 'Brand')
                .populate('pattern', { _id: 0, register: 0 }, 'Model')
                .exec((err, _sheets) => {
                    if (err)
                        return res.status(500).json({ raise: err })
                    if (!_sheets)
                        return res.status(404).json({ raise: 'not found result' })
                    res.status(202).json(_sheets)
                })
        } catch (error) {
            res.status(501).json({ raise: error })
        }
    }

    /**
     * sheetRelated
     * @param sheet string
     * @param limit number
     * @method get
     */
    public sheetRelated(req: Request, res: Response) {
        try {
            Sheet
                .find({ sheet: req.query.sheet, _id: { $ne: req.query.sid } })
                // .sort({ rate: 1})
                .limit(parseInt(req.query.limit))
                .populate('brand', { _id: 0, register: 0 }, 'Brand')
                .populate('pattern', { _id: 0, register: 0 }, 'Model')
                .select({ auth: 0, dirsheet: 0, rate: 0 })
                .exec((err, _sheet) => {
                    if (err)
                        return res.status(500).json({ raise: err })
                    if (!_sheet)
                        return res.status(404).send({ raise: 'not found' })
                    res.status(200).json(_sheet)
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
            let brand: any = await Brand.findOne({ bid: req.body['brand'] }, (err, vbrand) => vbrand)
            let model: any = await Models.findOne({ mid: req.body['model'] }, (err, vmodel) => vmodel)
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
            Sheet
                .findOne({ sheet: req.body.sheet, brand: brand._id, pattern: model._id })
                .populate('brand', { _id: 0, register: 0 }, 'Brand')
                .populate('pattern', { _id: 0, register: 0 }, 'Model')
                .exec(async (err, _sheet) => {
                    // console.log('RESULT BY POPULATE ', _sheet)
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
                            // console.log('request User', req['user'])
                            sheet.save((err, _st) => {
                                if (err) return res.status(503).json({ raise: 'La hoja no se ha guardado' })

                                res.status(201).json({ status: true })
                            })
                        })
                    } else {
                        res.status(409).json({ raise: 'La hoja técnica ya existe' })
                    }
                })
        } catch (error) {
            res.status(501).json({ raise: error })
        }
    }

    /**
     * updateSheet
     * @method PUT
     * @param {string} _sheet - objectid for sheet
     * @param {string} bid - brand id
     * @param {string} pid - pattern id
     * @param {file?optional} file - file replace sheet
     * @param sheet
     */
    public async updateSheet(req: Request, res: Response) {
        console.log(req.body.bid)
        console.log(typeof req.body.bid)
        let brand: any = await Brand.findOne({ bid: req.body['bid'] }, (err, vbrand) => vbrand)
        let model: any = await Models.findOne({ mid: req.body['pid'] }, (err, vmodel) => model = vmodel)
        let st: any = await Sheet.findById(req.body._sheet, (err, vst) => vst)
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
        let dirsheet: string = path.join(config.SOURCE_LIBRARY, req.body.sheet)
        // console.log('Exists ', fs.existsSync(dirsheet))
        if (!fs.existsSync(dirsheet)) {
            fs.mkdirSync(dirsheet, '0777')
            fs.chmodSync(dirsheet, '0777')
        }
        // console.log('here files', brand)
        try {
            if (req.files != null) {
                let shbinary: any = req.files.file
                dirsheet = path.join(dirsheet, `${brand.bid}-${model.mid}${path.extname(shbinary.name)}`)
                console.log(st.dirsheet, dirsheet)
                if (st.dirsheet === dirsheet)
                    fs.unlink(dirsheet)
                shbinary.mv(dirsheet, (err) => {
                    if (err)
                        return res.status(500).json({ raise: err })
                })
            } else {
                dirsheet = path.join(dirsheet, `${brand.bid}-${model.mid}.pdf`)
                console.log(st.dirsheet, dirsheet)
                if (st.dirsheet != dirsheet)
                    fs.rename(st.dirsheet, dirsheet, (err) => {
                        return res.status(500).json({ raise: err })
                    })
            }
        } catch (error) {
            return res.status(500).json({ raise: error})
        }
        Sheet
            .findByIdAndUpdate(req.body._sheet, {
                $set: {
                    brand: brand._id,
                    pattern: model._id,
                    dirsheet: dirsheet
                }
            },
            (err, _sheet) => {
                if (err)
                    return res.status(500).json({ raise: err })
                if (!_sheet)
                    return res.status(404).json({ raise: 'not found sheet' })
                res.status(200).json(true)
            })
    }

    /**
     * saveRate
     * @param sheet
     * @param auth
     * @param star
     * @method post
     */
    public saveRate(req: Request, res: Response) {
        try {
            // console.log(req.body);
            // find sheet
            Sheet
                .findById(req.body.sheet, (err, _sheet) => {
                    if (err)
                        return res.status(500).json({ raise: err })
                    if (!_sheet)
                        return res.status(404).json({ raise: 'Sheet not found, not save' })
                    // get rating by auth
                    // verify exist content
                    if (_sheet.rate.length == 0) {
                        _sheet.rate.push(setStar(req.body.auth, req.body.star))
                        _sheet.save()
                        return res.status(200).json({ 'nothing': true }).end()
                    } else {
                        let index = _sheet.rate.findIndex((star) => Types.ObjectId(req.body.auth).equals(Types.ObjectId(star.auth)))
                        if (index != -1) {
                            console.log('Index object', index, typeof index)
                            _sheet.rate[index] = setStar(req.body.auth, req.body.star)
                        } else {
                            // set firt rating by sheet
                            _sheet.rate.push(setStar(req.body.auth, req.body.star))
                        }
                        _sheet.save()
                        res.status(200).json({ msg: 'save rating sucessful'})
                    }
                })
            // res.status(201).send('true')
        } catch (error) {
            res.status(501).json({ raise: error })
        }
    }

    /**
     * get Rating By Sheet
     */
    public getRatingBySheet(req: Request, res: Response) {
        Sheet.findById(req.params.sheet, (err, _sheet) => {
            if (err)
                return res.status(500).json({ raise: err })
            if (!_sheet)
                return res.status(404).json({ raise: 'not found sheet'})
            if (_sheet.rate.length) {
                let rates: Array<number> = [0, 0, 0, 0, 0]
                let amount: number = 0
                let avg: number = 0
                _sheet.rate.forEach((star, index) => {
                    if (star.starOne) rates[0] += 1
                    if (star.starTwo) rates[1] += 1
                    if (star.starThree) rates[2] += 1
                    if (star.starFour) rates[3] += 1
                    if (star.starFive) rates[4] += 1
                })
                // console.log(rates);
                amount = rates.reduce( (vp, vc) => vp + vc , 0 )
                console.log(amount);
                avg = (
                    (
                        (rates[0] * 1) +
                        (rates[1] * 2) +
                        (rates[2] * 3) +
                        (rates[3] * 4) +
                        (rates[4] * 5)
                    ) / amount
                )
                res.status(200).json( avg )
            } else
                res.status(200).json(0)
        })
    }

}
