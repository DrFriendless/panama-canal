import {Component, ElementRef} from "@angular/core";

@Component({
  selector: 'location',
  imports: [
  ],
  templateUrl: './location.component.html',
  host: {
    '[style.display]': `'inline-block'`
  }
})
export class LocationComponent {
  constructor(public element: ElementRef) {
  }
}
