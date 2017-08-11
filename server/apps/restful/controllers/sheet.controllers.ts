import { Sheet } from '../models/sheet.models';
import { BaseController } from '../services/index.controllers';

export class SheetController extends BaseController {
    model = Sheet;

    constructor() {
        super();
    }

}
