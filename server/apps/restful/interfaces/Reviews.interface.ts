import { ISheet } from './Sheet.interface';

export interface IReviews {
    _id?: string
    auth: string
    sheet: string
    comment: string
    register: string|number|Date
}