import { Component, OnInit } from '@angular/core'
import { MdSnackBar } from '@angular/material'
import { HttpResponse, HttpEventType } from '@angular/common/http'

import { ExportService } from '../services/sheet/export.service'
import { UtilService } from '../services/util.service'


@Component({
    selector: 'export-data',
    templateUrl: './export.component.html'
})
export class ExportComponent implements OnInit {

    process: boolean = true
    percentUpload: number = 0

    constructor(
        private snackBar: MdSnackBar,
        private exServ: ExportService
    ) {}

    ngOnInit(): void {
        // this.process = false
    }

    uploadToServer(): void {
        let file: HTMLInputElement = <HTMLInputElement>document.getElementById('file')
        if (file.files.length) {
            this.exServ
                .importFile(UtilService.convertToForm({ file: file.files[0] }))
                .subscribe(
                    event => {
                        if (event.type === HttpEventType.UploadProgress )
                        {
                            this.percentUpload = (Math.round((100 * event.loaded) / event.total))
                        }
                        else if (event instanceof HttpResponse) {
                            this.snackBar.open(`Archivo Cargado completamente`, null, { duration: 2600 })
                            this.percentUpload = 0
                        }
                    },
                    err => {
                        console.log(err)
                        this.snackBar.open(`Error: ${err.message}`, null, { duration: 4600 })
                        this.percentUpload = 0
                    }
                )
        }
    }

    test(): void {
        console.log('it clicked!');
        this.process = !this.process
    }


}
