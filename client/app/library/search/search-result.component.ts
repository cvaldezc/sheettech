import { Component, Input, OnInit } from '@angular/core'


@Component({
    selector: 'search-result',
    templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnInit {

    @Input('code') mcode: string
    @Input('name') mname: string
    @Input('brand') mbrand: string
    @Input('pattern') mpattern: string

    @Input()
    set showData(isFind: boolean) {
        console.info(isFind);

        if (isFind) this.showanother()
    }


    ngOnInit(): void {
        // this.showanother()
    }

    showanother() {
        console.log(this.mcode);
        console.log(this.mname);
        console.log(this.mbrand);
        console.log(this.mpattern);
    }

}