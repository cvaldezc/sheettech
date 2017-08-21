export class UtilsService {

    public static strCapitalize(strings: string): string {
        let capitalize: string = '';
        strings.split(' ').forEach((val: string, index: number) => {
            let word: string = val.toLocaleLowerCase()
            capitalize.concat( word.charAt(0).toLocaleUpperCase().concat(word.slice(1)) )
            capitalize.concat(' ')
        });
        return capitalize.trim();
    }

}