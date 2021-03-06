import { Request, Response } from 'express'
import fetch from 'node-fetch'
import { DocumentQuery } from 'mongoose'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'

import { config } from '../../../config.server'
import { IBrand } from '../interfaces/Brand.inteface'
import { Brand, IBrandDocument } from '../models/brand.models'


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
     * getLocalBrands
     */
    public getLocalBrands(req: Request, res: Response) {
        try {
            Brand.find((err, _brands) => {
                if (err) return res.status(501).json({ raise: err })
                if (!_brands)
                    return res.status(404).json({ raise: 'not found'})
                res.status(200).json(_brands)
            })
        } catch (error) {
            res.status(500).json({raise: error})
        }
    }

    /**
     * create Brand
     */
    public async createBrand(req: Request, res: Response) {
        try {
            // console.log(req)
            let brd: any
            let br: IBrandDocument = new Brand()
            if (req.body.hasOwnProperty('bid')) {
                br.bid = await req.body.bid
                br.brand = await req.body.brand
            } else {
                br.bid = await req.body.brand
                br.brand = await req.body.bname
            }
            brd = await br.save(async (err, _brand) => _brand)
            return await brd
        } catch (error) {
            return await { 'raise': error }
        }
    }

    /**
     * findByBID
     */
    public async findByBID(brand: string): Promise<string> {
        let fbrand: any = ''
        try{
            // await Brand.findOne({ bid: brand }, (err, _brand) => {
            //     if (err) fbrand = ''
            //     if (!_brand)
            //         fbrand = ''
            //     else
            //         fbrand = _brand._id
            // })
            fbrand = await Brand.findOne({ bid: brand }, (_brand) => _brand)
            if (typeof fbrand == 'object') {
                fbrand = await fbrand
            }
        }catch(err) {
            fbrand = ''
        }

        return await fbrand
    }

}