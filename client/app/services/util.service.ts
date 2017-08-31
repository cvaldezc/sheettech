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
}