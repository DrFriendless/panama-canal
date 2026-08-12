import {Component, effect, input, InputSignal, signal, WritableSignal} from "@angular/core";
import {NgStyle} from "@angular/common";
import {Positioner} from "./positioner";

@Component({
  selector: 'blank',
  imports: [
    NgStyle
  ],
  templateUrl: './blank.component.html'
})
export class BlankComponent {
  positioner: WritableSignal<Positioner> | undefined;
  start: InputSignal<number> = input.required();
  left: WritableSignal<string> = signal('0');
  top: WritableSignal<string> = signal('0');
  location: number = 0;

  constructor() {
    effect(() => {
      this.teleportTo(this.start());
    });
  }

  setPositioner(positioner: WritableSignal<Positioner>) {
    this.positioner = positioner;
  }

  teleportTo(loc: number) {
    this.location = loc;
    if (this.positioner) {
      const pos = this.positioner().position(loc);
      this.left.set(pos.left);
      this.top.set(pos.top);
    }
  }
}
