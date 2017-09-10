import { ISheet } from './Sheet.interface';

export interface IReviews {
    auth: string
    sheet: string
    comment: string
    register: string|number|Date
}