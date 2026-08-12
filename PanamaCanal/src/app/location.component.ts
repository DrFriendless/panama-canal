import {Component, computed, ElementRef, input} from "@angular/core";

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  host: {
    '[style.margin-left]': `(margins().indexOf('l') >= 0 && padding().length === 0) ? 'var(--location-gap)' : 0`,
    '[style.margin-right]': `margins().indexOf('r') >= 0 && padding().length === 0 ? 'var(--location-gap)' : 0`,
    '[style.margin-top]': `margins().indexOf('t') >= 0 && padding().length === 0 ? 'var(--location-gap)' : 0`,
    '[style.margin-bottom]': `margins().indexOf('b') >= 0 && padding().length === 0 ? 'var(--location-gap)' : 0`,
    '[style.width]': `width()`,
    '[style.height]': `height()`,

  }
})
export class LocationComponent {
  margins = input<string>("tr");
  padding = input<string>("");
  width = computed(() => {
    const p = this.padding();
    const l = p.indexOf('l') >= 0 ? 1 : 0;
    const r = p.indexOf('r') >= 0 ? 1 : 0;
    return `calc(var(--location-side) + ${l + r} * var(--location-gap))`;
  });
  height = computed(() => {
    const p = this.padding();
    const t = p.indexOf('t') >= 0 ? 1 : 0;
    const b = p.indexOf('b') >= 0 ? 1 : 0;
    return `calc(var(--location-side) + ${t + b} * var(--location-gap))`;
  });
  isOnTheLeft = computed(() => {
    const p = this.padding();
    return p.length > 0 && p.indexOf('l') < 0;
  });

  constructor(public element: ElementRef) {
  }
}
