import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.sass']
})
export class PageNotFoundComponent implements OnInit {
    // world
    land: Array<any>
    cloud: Array<any>
    // starfield
    starfield: HTMLCanvasElement
    canvas: CanvasRenderingContext2D
    stars: Array<object> = []
    shootingStars: Array<any> = []
    FPS: number = 120
    nstars: number = 650
    colorrange = [0, 60, 240]


    ngOnInit() {
        /**
         * block world
         */
        this.land = <any>document.querySelectorAll('.land')
        this.cloud = <any>document.querySelectorAll('.cloud')
        for (var i = 0; i < this.land.length; i++) {
            this.land[i].style.transform = `translate(${Math.round(Math.random() * 150)}px, ${Math.round(Math.random() * 150)}px)`
            this.land[i].style.width = `${Math.round(Math.random() * 50) + 50}px`
        }

        for (var i = 0; i < this.cloud.length; i++) {
            this.cloud[i].style.transform = `translate(${Math.round(Math.random() * 150)}px, ${Math.round(Math.random() * 150)}px)`
            this.cloud[i].style.width = `${Math.round(Math.random() * 25) + 25}px`
        }

        requestAnimationFrame(this.animate)
        /**
         * endblock world
         */
        /**
         * block star field
         */
        this.starfield = <HTMLCanvasElement>document.getElementById('space')
        this.starfield.width = 1765
        this.starfield.height = 1024
        this.canvas = this.starfield.getContext('2d')
        this.initStars()
        this.tick()
        // setInterval(() => {

        // }, 1200)
        /**
         * endbock
         */
    }

    /**
     * @function animate for world
     */
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
    /**
     * end block world
     */
    /**
     * block start field
     */
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initStars() {
        this.stars = []
        for (let i = 0; i < this.nstars; i++) {
            let x = Math.random() * this.starfield.width
            let y = Math.random() * this.starfield.height
            let radius = Math.random()
            let hue = this.colorrange[this.getRandom(0, this.colorrange.length - 1)]
            let sat = this.getRandom(50, 100)
            this.stars.push({
                x: x,
                y: y,
                radius: radius,
                hue: hue,
                sat: sat,
                vx: Math.floor(Math.random() * 10) - 5,
                vy: Math.floor(Math.random() * 10) - 5
            })
        }
    }

    update() {
        for (var i = 0, x = this.stars.length; i < x; i++) {
            var s = this.stars[i];

            s['x'] += s['vx'] / this.FPS;
            s['y'] += s['vy'] / this.FPS;

            if (s['x'] < 0 || s['x'] > this.starfield.width) s['x'] = -s['x'];
            if (s['y'] < 0 || s['y'] > this.starfield.height) s['y'] = -s['y'];
        }
    }

    draw(): void {
        this.canvas.clearRect(0, 0, this.starfield.width, this.starfield.height)
        this.canvas.globalCompositeOperation = "lighter"
        this.stars.forEach(star => {
            this.canvas.beginPath()
            this.canvas.arc(star['x'], star['y'], 1, 0, 2 * Math.PI)
            this.canvas.fillStyle = "hsl(" + star['hue'] + ", " + star['sat'] + "%, 80%)"
            this.canvas.fill()
        })
    }

    tick = () => {
        this.draw();
        this.update();
        requestAnimationFrame(this.tick);
    }
    /**
     * end block
     */

}
