import { Router } from 'express';
import { BrandController } from '../restful/controllers/brand.controller';


const brandUrls: Router = Router();

// remote all brands
brandUrls.get('/get/remote/all', new BrandController().getRemoteAllBrand)

export { brandUrls }
