import { Component, effect, signal, viewChildren} from "@angular/core";
import {TileComponent} from "./tile.component";
import {LocationComponent} from "./location.component";
import {BlankComponent} from "./blank.component";
import {Positioner} from "./positioner";
import {Slider} from "./slider";
import {NgClass} from "@angular/common";

@Component({
  selector: 'puzzle-panama-canal',
  imports: [
    TileComponent,
    LocationComponent,
    BlankComponent,
    NgClass
  ],
  templateUrl: './panama-canal.component.html'
})
export class PanamaCanalComponent {
  locations = viewChildren(LocationComponent);
  tiles = viewChildren(TileComponent);
  blanks = viewChildren(BlankComponent);
  positioner = signal<Positioner>(new Positioner(this.locations));
  slider = signal<Slider>(new Slider(this.blanks, this.tiles, 'panama-canal'));

  constructor() {
    effect(() => {
      const tiles = this.tiles();
      const blanks = this.blanks();
      for (const t of tiles) {
        t.setPositioner(this.positioner, this.slider);
      }
      for (const b of blanks) {
        b.setPositioner(this.positioner);
      }
    });
  }
}
