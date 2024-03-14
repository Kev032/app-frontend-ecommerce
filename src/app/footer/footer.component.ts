import { Component } from '@angular/core';
// import { fafaceb } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent {
  faFacebook = faFacebook;
  faFacebookSquare = faFacebook;
  faInstagramSquare = faInstagram;
  faTwitterSquare = faTwitter;
}
