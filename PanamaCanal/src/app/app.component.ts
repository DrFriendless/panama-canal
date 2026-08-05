import {Component, effect, ElementRef, signal, viewChildren, WritableSignal} from "@angular/core";
import {TileComponent} from "./tile.component";
import {LocationComponent} from "./location.component";
import {BlankComponent} from "./blank.component";
import {Positioner} from "./positioner";
import {Slider} from "./slider";
import {NgClass} from "@angular/common";
import {FakeLocationComponent} from "./fake-location.component";

export type PuzzleType = "panama-canal" | "bull-pen";

export type Orientation = "horizontal" | "vertical";

export interface Path {
  orientation: Orientation;
  locations: number[];
}

@Component({
  selector: 'puzzle-panama-canal',
  imports: [
    TileComponent,
    LocationComponent,
    BlankComponent,
    NgClass,
    FakeLocationComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  locations = viewChildren(LocationComponent);
  tiles = viewChildren(TileComponent);
  blanks = viewChildren(BlankComponent);
  positioner = signal<Positioner>(new Positioner(this.locations));
  puzzle = signal<PuzzleType>('bull-pen');
  slider = signal<Slider>(new Slider(this.blanks, this.tiles, this.puzzle));
  initialised: WritableSignal<boolean> = signal(false);

  constructor(element: ElementRef) {
    const t = element.nativeElement.attributes['puzzle'].value;
    this.puzzle.set(t);
    effect(() => {
      const tiles = this.tiles();
      const blanks = this.blanks();
      const pt = this.puzzle();
      console.log(pt);
      for (const t of tiles) {
        t.setPositioner(this.positioner, this.slider);
      }
      for (const b of blanks) {
        b.setPositioner(this.positioner);
      }
      this.initialised.set(true);
    });
  }
}
