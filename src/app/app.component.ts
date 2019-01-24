import { Component } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import faFacebook from '@fortawesome/fontawesome-free-brands/';
import * as smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      location.href = 'https://qa0w0aq.github.io/Binary-Vision-Service-Page-Mobile-master/';
    }
    fontawesome.library.add(faFacebook);
    smoothscroll.polyfill();
  }
}
