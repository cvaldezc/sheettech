import { Sheet } from '../models/sheet.models';
import { BaseController } from '../services/base.services';

export class SheetController extends BaseController {
    model = Sheet;

    constructor() {
        super();
    }

}
