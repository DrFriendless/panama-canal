import {Component, input, InputSignal, signal, WritableSignal} from "@angular/core";
import {NgStyle} from "@angular/common";
import {Positioner} from "./positioner";
import {Slider} from "./slider";

@Component({
  selector: 'tile',
  imports: [
    NgStyle
  ],
  templateUrl: './tile.component.html'
})
export class TileComponent {
  positioner: WritableSignal<Positioner> | undefined;
  slider: WritableSignal<Slider> | undefined;
  start: InputSignal<number> = input.required();
  text: InputSignal<string> = input.required();
  left: WritableSignal<number> = signal(0);
  top: WritableSignal<number> = signal(0);
  location: number = 0;

  setPositioner(positioner: WritableSignal<Positioner>, slider: WritableSignal<Slider>) {
    this.positioner = positioner;
    this.slider = slider;
    this.location = this.start();
    const pos = this.positioner().position(this.location);
    this.left.set(pos.left);
    this.top.set(pos.top);
  }

  slideTo(loc: number) {
    this.location = loc;
    if (this.positioner) {
      const pos = this.positioner().position(loc);
      this.left.set(pos.left);
      this.top.set(pos.top);
    }
  }

  handleClick(event: MouseEvent) {
    if (this.slider) {
      this.slider().requestSlide(this.location);
    }
  }
}
