import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], filter: object|string): any {
        if (filter && Array.isArray(items)) {
            let filterKeys: Array<string> = Object.keys(filter)
            // console.log(items)
            return items.filter( function(item) {
                return filterKeys.some(function(keyName) {
                    // console.log(filter[keyName], item[keyName]);
                    let val = filter[keyName] || ''
                    return new RegExp(`${val}`, 'i').test(item[keyName]) || (val == '')
                }, true)
            })
                // filterKeys.reduce(function(mem, keyName) {
                    // return (mem && new RegExp(`\\b${filter[keyName]}\\b`, 'i').test(item[keyName]))
                // }))
                // (mem && new RegExp(`\\b${filter[keyName]}\\b`, 'i').test(item[keyName])) || filter[keyName] === '', true))
        }
        else if (items && typeof filter === 'string') {
            return items.filter(item => new RegExp(`${item}`, 'i').test(filter))
        } else {
            return items
        }
    }

}
