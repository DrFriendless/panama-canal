import {Component, ElementRef, input} from "@angular/core";

@Component({
  selector: 'fake-location',
  imports: [
  ],
  templateUrl: './fake-location.component.html',
  host: {
    '[style.margin-left]': `margins().indexOf('l') >= 0 ? 'var(--location-gap)' : 0`,
    '[style.margin-right]': `margins().indexOf('r') >= 0 ? 'var(--location-gap)' : 0`,
    '[style.margin-top]': `margins().indexOf('t') >= 0 ? 'var(--location-gap)' : 0`,
    '[style.margin-bottom]': `margins().indexOf('b') >= 0 ? 'var(--location-gap)' : 0`
  }
})
export class FakeLocationComponent {
  margins = input<string>("tr");
  constructor(public element: ElementRef) {
  }
}
