import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, } from '@angular/router'
import { Observable } from 'rxjs/Observable'
// import { DomSanitizer } from '@angular/platform-browser'
// import { MdIconRegistry } from '@angular/material'

import { UtilService } from '../../services/util.service'
import { FavoriteService } from '../../services/sheet/favorite.service'
import { AuthServices } from '../../services/auth/auth.service'
import { IFavorite } from '../../../../server/apps/restful/interfaces/Favorite.interface'


@Component({
    selector: 'bookmark-library',
    templateUrl: './bookmark.component.html'
})
export class BookMarkComponent implements OnInit {

    favorites: Observable<Array<IFavorite>>
    search: string = ''


    constructor(
        private userServ: AuthServices,
        private favServ: FavoriteService,
        private router: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        setTimeout(() => {
            this.favorites = this.favServ.getFavoritesbyUser(this.userServ._uid)
        }, 1200)
        // this.router.fragment.subscribe( f => {
        //     // console.log(f)
        // })
        // console.log(UtilService.parserFragment(this.router.parseUrl(this.router.url).fragment))
        // console.log()

    }

}
