export class UtilService {

    constructor() {

    }

    /**
     * convertToForm
     */
    public static convertToForm(src: object|string): FormData {
        let form = new FormData()
        if (src && typeof src === 'object') {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    form.append(key, src[key]);
                }
            }
        }
        return form
    }

    /**
     * parse fragment
     */
    public static parserFragment(fragment: string): object {
        let arrfra: Array<string> = fragment.split(',')
        let obj: object = {}
        for (var key in arrfra) {
            let element = arrfra[key]
            let fragment = arrfra[key].split('=')
            obj[fragment[0]] = fragment[1]
        }
        return obj
    }

}