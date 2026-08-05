import {Component, ElementRef} from "@angular/core";

@Component({
  selector: 'fake-location',
  imports: [
  ],
  templateUrl: './fake-location.component.html',
  host: {
    '[style.display]': `'inline-block'`
  }
})
export class FakeLocationComponent {
  constructor(public element: ElementRef) {
  }
}
