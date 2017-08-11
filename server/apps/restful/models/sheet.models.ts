import * as mongoose from 'mongoose';

const SheetSchema = new mongoose.Schema({
    material: { type: String },
    description: { type: String, trim: true },
    brand: { type: String },
    model: { type: String },
    sheetfile: { type: String },
    isactive: { type: Boolean, default: true },
    register: { type: Date, default: Date.now() }
});

const Sheet = mongoose.model('Sheet', SheetSchema);

export { Sheet };
