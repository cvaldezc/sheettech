import { Component, Input, OnInit } from '@angular/core'
import { NotificationsService } from 'angular2-notifications'

import { IReviews } from '../../../../../server/apps/restful/interfaces/Reviews.interface'
import { SheetService } from '../../../services/sheet/sheet.service'
import { ReviewsService } from '../../../services/sheet/reviews.service'
import { AuthServices } from '../../../services/auth/auth.service'


@Component({
    selector: 'sheet-reviews',
    templateUrl: './reviews.component.html'
})
export class ReviewsComponent {

    /* input variable */
    @Input('sheet')
    set valSheet(st: string) {
        this._sheet = st
        this.onInit()
    }

    /* varibles local */
    _sheet: string = ''
    _boxcomment: boolean = false
    comment: string = ''
    commentList: Array<IReviews> = []
    _user: string = ''

    constructor(
        private reviewServ: ReviewsService,
        // private sheetServ: SheetService,
        private notify: NotificationsService,
        private userServ: AuthServices
    ) { }

    public optNotify = {
        position: ['bottom', 'left'],
        timeOut: 3600,
        animate: 'scale'
    }

    onInit(): void {
        // console.log('init reviews', this._sheet)
        setTimeout(() => {
            this._user = this.userServ._uid
            this.getReviews()
        }, 1200)
    }

    getReviews(): void {
        this.reviewServ
            .list(this._sheet).subscribe(
            reviews => this.commentList = reviews,
            err => console.log(err)
            )
    }

    save(): void {
        let params: object = {
            sheet: this._sheet,
            auth: this.userServ._uid,
            comment: this.comment
        }
        if (this.comment != '') {
            this.reviewServ
                .save(params)
                .subscribe(
                (observer) => {
                    this.getReviews()
                    this._boxcomment = false
                    this.comment = ''
                    this.notify.success('Publicado', 'correctamente!', this.optNotify)
                },
                (err) => console.log(err)
                )
        } else {
            this.notify.warn('Alerta', 'Debe ingresar un comentario', this.optNotify)
        }
    }

    update(review: string): void {
        let params: object = {
            review: review,
            comment: <HTMLTextAreaElement>document.getElementById(`up${review}`)['value']
        }
        this.reviewServ.update(params)
            .subscribe(
            (observer) => {
                this.getReviews()
                this.notify.info('Info', 'correctamente!', this.optNotify)
            },
            err =>
                this.notify.error('Error', `${err}`, this.optNotify)
            )
    }

    showUpdate(rv: string, comment: string): void {
        // get paragraph content
        var content: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById(`${rv}`)
        if (content.childNodes.length == 0) {
            // create buttons action
            // create cancel
            let btnCancel: HTMLButtonElement = <HTMLButtonElement>document.createElement('button')
            btnCancel.setAttribute('type', 'button')
            btnCancel.setAttribute('class', 'mat-icon-button')
            // icon for btnCancel
            let icancel = document.createElement('md-icon')
            icancel.setAttribute('class', 'red-text md-18 mat-icon material-icons')
            icancel.innerText = 'clear'
            btnCancel.appendChild(icancel)
            btnCancel.onclick = () => {
                this.cancelUpdate(rv)
            }
            // btn save
            let btnupdate: HTMLButtonElement = <HTMLButtonElement>document.createElement('button')
            btnupdate.setAttribute('type', 'button')
            btnupdate.setAttribute('class', 'mat-icon-button')
            let isave = document.createElement('md-icon')
            isave.setAttribute('class', 'light-green-text md-18 mat-icon material-icons')
            isave.innerText = 'chat'
            btnupdate.appendChild(isave)
            btnupdate.onclick = () => this.update(rv)
            // create div dom
            var divcontent: HTMLDivElement = document.createElement('div')
            divcontent.setAttribute('id', `${rv}-content`)
            divcontent.setAttribute('class', 'brown lighten-5')
            // create textarea updatetext
            let uptext: HTMLTextAreaElement = document.createElement('textarea')
            uptext.setAttribute('id', `up${rv}`)
            uptext.setAttribute('class', 'mat-input-element ng-untouched ng-pristine')
            uptext.innerText = comment
            // set in the DOM
            divcontent.appendChild(btnCancel)
            divcontent.appendChild(btnupdate)
            divcontent.appendChild(uptext)
            content.appendChild(divcontent)
            uptext.focus()
        }
    }

    cancelUpdate(rv: string): void {
        var content: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById(`${rv}`)
        content.innerHTML = ''
    }

    remove(rv: string): void {
        let params: object = { review: rv }
        this.reviewServ
            .remove(params)
            .subscribe(
            (observer) => {
                let index = this.commentList.findIndex(obj => obj['_id'] == this._sheet)
                console.log('index remove', index);

                if (index != -1)
                    console.log('remove list ');

                this.commentList.splice(index, 1)
                this.notify.success('Correctamente', 'eliminado!', this.optNotify)
            },
            (err) => {
                console.log(err);
                this.notify.error('Error', '${err.body}')
            }
            )
    }

}
