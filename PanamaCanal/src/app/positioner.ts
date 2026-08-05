import {computed, Signal} from "@angular/core";
import {LocationComponent} from "./location.component";

/**
 * In charge of figuring out where things go.
 */
export class Positioner {
  offsets: Signal<{dx: number, dy: number}> = computed(() => {
    if (this.locations().length > 0) {
      const pe0 = this.locations()[0].element.nativeElement.parentElement;
      // find the top left corner of the grid, whether there is a tile there or not.
      let left = 1000000;
      let top = 1000000;
      for (const l of this.locations()) {
        const ne = l.element.nativeElement;
        if (ne.offsetLeft < left) left = ne.offsetLeft;
        if (ne.offsetTop < top) top = ne.offsetTop;
      }
      const dx = pe0.offsetLeft - left;
      const dy = pe0.offsetTop - top;
      return {dx, dy};
    } else {
      return {dx: 0, dy: 0};
    }
  });

  constructor(private locations: Signal<readonly LocationComponent[]>) {
  }

  position(loc: number): { left: number, top: number } {
    const l = this.locations()[loc];
    const ne = l.element.nativeElement;
    const offs = this.offsets();
    return {left: ne.offsetLeft + offs.dx, top: ne.offsetTop + offs.dy};
  }
}
