export class UtilsService {

    public static strCapitalize(strings: string): string {
        let capitalize: string = '';
        strings.split(' ').forEach((val: string, index: number) => {
            let word: string = val.toLowerCase()
            capitalize = capitalize.concat( word.charAt(0).toUpperCase().concat(word.slice(1)) )
            capitalize = capitalize.concat(' ')
        });
        return capitalize.trim();
    }

}