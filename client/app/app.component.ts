import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  toogle = false;

  test(): void {
    this.toogle = !this.toogle;
    console.log('Successful call function');
  }

}
