import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.sass']
})
export class PageNotFoundComponent implements OnInit {

    land: Array<any>
    cloud: Array<any>

    ngOnInit() {
        this.land = <any>document.querySelectorAll('.land')
        this.cloud = <any>document.querySelectorAll('.cloud')
        for (var i = 0; i < this.land.length; i++) {
            this.land[i].style.transform = `translate(${Math.round(Math.random() * 150)}px, ${Math.round(Math.random() * 150)}px)`
            this.land[i].style.width = `${Math.round(Math.random() * 50) + 50 }px`
        }

        for (var i = 0; i < this.cloud.length; i++) {
            this.cloud[i].style.transform = `translate(${Math.round(Math.random() * 150)}px, ${Math.round(Math.random() * 150)}px)`
            this.cloud[i].style.width = `${Math.round(Math.random() * 25) + 25 }px`
        }

       requestAnimationFrame(this.animate)
    }

    animate = () => {
        // console.log(this.land.length)

        for (var x = 0; x < this.land.length; x++) {
           this.moved(this.land[x])
           this.moved(this.cloud[x])
        }
        requestAnimationFrame(this.animate)
    }

    moved(element): void {
        // console.log(element)
        let s = element.style.transform.split('(')[1].split(',')
        let x = s[0].split('px')[0]
        let y = s[1]
        let w = element.style.width.split('px')[0]

        let nx = parseInt(x) - 1
        if (nx + parseInt(w) < -20) {
            nx = 200
        }
        element.style.transform = `translate(${nx}px, ${y}`
    }

}
