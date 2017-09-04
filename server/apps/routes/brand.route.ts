import { Router } from 'express';
import { BrandController } from '../restful/controllers/brand.controller';


const brandUrls: Router = Router();

// remote all brands
brandUrls.get('/remote/all', new BrandController().getRemoteAllBrand)
// all brand local
brandUrls.get('/all', new BrandController().getLocalBrands)

export { brandUrls }
