import {Component, input, InputSignal, signal, WritableSignal} from "@angular/core";
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
  left: WritableSignal<number> = signal(0);
  top: WritableSignal<number> = signal(0);
  location: number = 0;

  setPositioner(positioner: WritableSignal<Positioner>) {
    this.positioner = positioner;
    this.location = this.start();
    const pos = this.positioner().position(this.location);
    this.left.set(pos.left);
    this.top.set(pos.top);
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
