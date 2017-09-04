import { Router } from 'express';
import { ModelController } from '../restful/controllers/model.controller'


const modelUrls: Router = Router()

// get remote all model
modelUrls.get('/remote/all', new ModelController().getRemoteAllModel)
modelUrls.get('/all', new ModelController().getLocalModels)

export { modelUrls }
