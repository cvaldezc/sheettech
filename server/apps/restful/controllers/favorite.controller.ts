import { Request, Response } from 'express';
import { Types } from 'mongoose';

import { Favorite } from '../models/favorite.models'


export class FavoriteController {

    /**
     * @function saveFavorite
     * @method post
     * @param auth
     * @param sheet
     */
    public saveFavorite(req: Request, res: Response) {
        // find sheet in array
        Favorite
            .findOne({ auth: Types.ObjectId(req.body.auth) })
            .exec((err, _fav) => {
                if (err)
                    return res.status(500).json({ raise: err })
                if (!_fav){
                    let ot = new Favorite()
                    ot.auth = req.body.auth
                    ot.favorites.push(req.body.sheet)
                    ot.save()
                    res.status(201).json('successful')
                }else{
                    _fav.favorites.push(req.body.sheet)
                    _fav.save()
                    return res.status(201).json({ msg: 'successful' })
                }
            })
    }

    /**
     * @function getFavorites
     * @class FavoriteController
     * @method get
     * @param auth
     * @description get all sheet by user
     */
    public getFavorites(req: Request, res: Response) {
        console.log(req.params)
        console.log(req.query)
        console.log(req.body)

        Favorite
        .findOne({ auth: Types.ObjectId(req.query.auth) })
        .populate(
           {
               path: 'favorites',
               select:  { rate: 0, dirsheet: 0, auth: 0, register: 0 },
               model: 'Sheet',
               populate: [{ path: 'brand', select: { brand: 1, bid: 1 } }, { path: 'pattern', select: { model: 1, mid: 1 } }],
           }
        )
        .exec( (err, fav) => {
            if (err)
                return res.status(500).json({ raise: err })
            if (!fav)
                return res.status(404).json({ raise: 'favorites not found' })
            // fav = fav.populate('brand')
            res.status(200).json(fav.favorites)
        })
    }

    /**
     * @function removeFavorite
     * @class FavoriteController
     * @method post
     * @param auth object id for user
     * @param sheet object id for sheet
     */
    public removeFavorite(req: Request, res: Response) {
        Favorite
        .update(
            { auth: Types.ObjectId(req.body.auth) },
            { $pull: { favorites: Types.ObjectId(req.body.sheet) } }
        )
        .exec( (err, _fav) => {
            if (err)
                return res.status(500).json({ raise: err })
            if (!_fav)
                return res.status(404).json({ raise: 'No se ha encontrado la hoja' })
            console.log('This UPdate ', _fav);

            res.status(200).json(false)

        })
    }

    /**
     * @function verifyFavorite
     * @class FavoriteController
     * @method get
     * @param auth
     * @param sheet
     * @description this function valid checked of sheet favorite
     */
    public verifyFavorite(req: Request, res: Response) {
        Favorite
        .findOne({
            auth: Types.ObjectId(req.params.auth),
            favorites: { $in: [ req.params.sheet ] }
        })
        .exec( (err, _fav) => {
            if (err)
                return res.status(500).json({ raise: err })
            if (!_fav)
                return res.status(201).json( false )
            res.status(200).json( true )
        })
    }

}