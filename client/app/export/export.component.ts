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
    ukey: string = ''
    resultNotfound: Array<any> = []

    constructor(
        private snackBar: MdSnackBar,
        private exServ: ExportService
    ) {}

    ngOnInit(): void { }

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
                            this.ukey = event.body['ukey']
                            this.percentUpload = 0
                            this.readerSource()
                        }
                    },
                    err => {
                        console.log(err)
                        this.snackBar.open(`Error: ${err.message}`, null, { duration: 4600 })
                        this.percentUpload = 0
                    }
                )
        } else {
            this.snackBar.open('Debe de seleccionar por lo menos un archivo valido', null, { duration: 3600 })
        }
    }

    readerSource(): void {
        if (this.ukey !== ''){
            this.exServ.readerSource(this.ukey)
                .subscribe(
                    res => {
                        this.percentUpload += 16.6666
                        if (res.hasOwnProperty('notfound')) {
                            this.resultNotfound = res['notfound']
                            this.snackBar.open('No se han encontrado hojas técnicas para todos!', 'Desea continuar?')
                                .onAction().subscribe( res => this.findPaths() )
                        }else{
                            this.findPaths()
                        }
                    },
                    err => {
                        this.percentUpload = 0
                        this.snackBar.open(`Error: ${err.error.raise} ${err.message}`, null, { duration: 3600 })
                        // be remove folder temp
                        this.exServ.removeUKey(this.ukey).subscribe(res => console.log(res), err => console.error(err))
                    }
                )
        } else {
            this.snackBar.open('UUID invalido!', null, { duration: 4600 })
        }
    }


    findPaths(): void {
        this.exServ.findPathSheets(this.ukey)
            .subscribe(
                res => {
                    this.percentUpload += 16.6666
                    this.performCopyFiles()
                },
                err => {
                    this.percentUpload = 0
                    this.snackBar.open(`Error: ${err.error.raise} ${err.message}`, null, { duration: 3600 })
                    // be remove folder temp
                    this.exServ.removeUKey(this.ukey).subscribe(res => console.log(res), err => console.error(err))
                }
            )
    }

    performCopyFiles(): void {
        this.exServ.processCopy(this.ukey)
            .subscribe(
                res => {
                    this.percentUpload += 16.6666
                    this.snackBar.open('Seleccione un modo de descarga en ZIP o PDF', null)
                    this.process = false
                    // this.selectTypeFile()
                },
                err => {
                    this.percentUpload = 0
                    this.snackBar.open(`Error: ${err.error.raise} ${err.message}`, null, { duration: 3600 })
                    // be remove folder temp
                    this.exServ.removeUKey(this.ukey).subscribe(res => console.log(res), err => console.error(err))
                }
            )
    }

    makeFile(type: number): void {
        this.snackBar.dismiss()
        this.snackBar.open('Este proceso puede tardar varios minutos, espere!', null)
        this.exServ.makeFileDown(this.ukey, type)
            .subscribe(
                res => {
                    this.percentUpload = 100
                    console.log('save file');
                    let blob = new Blob([res], { type: (type == 1) ? 'application/pdf' : 'application/zip' })
                    window.open(URL.createObjectURL(blob))
                },
                err => {
                    console.log(err)
                    this.percentUpload = 0
                    this.snackBar.open(`Error: ${err.error.raise} ${err.message}`, null, { duration: 3600 })
                    // be remove folder temp
                    this.exServ.removeUKey(this.ukey).subscribe(res => console.log(res), err => console.error(err))
                },
                () => {
                    this.snackBar.dismiss()
                }
            )
    }



    test(): void {
        console.log('it clicked!');
        // this.process = !this.process
    }


}
