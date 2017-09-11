import { Response, Request } from 'express'
import { Types } from 'mongoose'

// import { IReviews } from '../interfaces/Reviews.interface'
import { Reviews } from '../models/reviews.models'


export class ReviewsController {

    /**
     * save
     * @class ReviewsController
     * @method POST
     * @param auth -> objectid user
     * @param sheet -> objectid sheet
     * @param comment -> string
     */
    public save(req: Request, res: Response) {
        let reviews = new Reviews()
        reviews.sheet = req.body.sheet
        reviews.auth = req.body.auth
        reviews.comment = req.body.comment
        // reviews.register
        reviews.save((err, _reviews) => {
            if (err)
                return res.status(500).json(false)
            res.status(201).json(_reviews)
        })
    }

    /**
     * remove
     * @class ReviewsController
     * @method DELETE
     * @param user
     * @param sheet
     */
    public remove(req: Request, res: Response) {
        Reviews.remove(
            {
                auth: Types.ObjectId(req.body.auth),
                sheet: Types.ObjectId(req.body.sheet)
            },
            (err) => {
                if (err)
                    return res.status(500).json(false)
                else
                    return res.status(200).json(true)
            })
    }

    /**
     * update\
     * @class ReviewsController
     * @method UPDATE
     * @param reviews -> ObjectId
     * @param comment
     */
    public update(req: Request, res: Response) {
        Reviews
        .findById(req.body.review, (err, _reviews) => {
            if (err)
                return res.status(500).json(err)
            if (_reviews)
                return res.status(404).json(false)
            res.status(202).json(_reviews)
        })
    }

}
