import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sandbox';
  lang: string = 'et';

  setLang(lang: string) {
    this.lang = lang
  }
}
