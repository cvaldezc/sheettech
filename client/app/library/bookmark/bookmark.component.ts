import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
// import { DomSanitizer } from '@angular/platform-browser'
// import { MdIconRegistry } from '@angular/material'

import { FavoriteService } from '../../services/sheet/favorite.service'
import { AuthServices } from '../../services/auth/auth.service'
import { IFavorite } from '../../../../server/apps/restful/interfaces/Favorite.interface'


@Component({
    selector: 'bookmark-library',
    templateUrl: './bookmark.component.html'
})
export class BookMarkComponent implements OnInit {

    favorites: Observable<Array<IFavorite>>

    constructor(
        private userServ: AuthServices,
        private favServ: FavoriteService
    ) { }

    public ngOnInit(): void {
        setTimeout(() => {
            this.favorites = this
                .favServ
                .getFavoritesbyUser(this.userServ._uid)
        }, 1200)
    }

}
