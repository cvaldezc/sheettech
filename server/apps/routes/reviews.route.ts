import { Router } from 'express'

import { ReviewsController } from '../restful/controllers/reviews.controller'
import { isAuth } from '../restful/middlewares/auth.middleware'


const reviewsUrls = Router()


// reviews create
reviewsUrls.post('/save', isAuth, new ReviewsController().save)
// reviews update
reviewsUrls.put('/update', isAuth, new ReviewsController().update)
// reviews remove
reviewsUrls.delete('/remove', isAuth, new ReviewsController().remove)

export { reviewsUrls }
