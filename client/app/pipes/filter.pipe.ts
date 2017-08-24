import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], filter: object|string|any[]): any {
        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter)
            return items.filter( item =>
                filterKeys.reduce( (mem, keyName) =>
                    (mem && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true))
        }
        else if (items && typeof filter === 'string') {
            return items.filter(item => item.indexOf(filter) !== -1)
        } else {
            return items
        }
    }

}
