import {computed, signal, Signal} from "@angular/core";
import {BlankComponent} from "./blank.component";
import {TileComponent} from "./tile.component";
import {Path, PuzzleType} from "./interfaces";

/**
 * In charge of sliding tiles around.
 */
export class Slider {
  readonly PANAMA_CANAL_PATHS: Path[] = [
    { orientation: "horizontal", locations: [0,1,2,3,4,5] },
    { orientation: "horizontal", locations: [6,7,8,9,10,11] },
    { orientation: "vertical", locations: [0,6]},
    { orientation: "vertical", locations: [1,7]},
    { orientation: "vertical", locations: [2,8]},
    { orientation: "vertical", locations: [3,9]},
    { orientation: "vertical", locations: [4,10]},
    { orientation: "vertical", locations: [5,11]}
  ];
  readonly BULL_PEN_PATHS: Path[] = [
    { orientation: "horizontal", locations: [1,2,3] },
    { orientation: "horizontal", locations: [4,5,6] },
    { orientation: "vertical", locations: [1,4]},
    { orientation: "vertical", locations: [0,2,5]},
    { orientation: "vertical", locations: [3,6]},
  ];
  complete = signal<boolean>(false);
  paths = computed(() => {
    if (this.puzzleType === "panama-canal") {
      return this.PANAMA_CANAL_PATHS;
    } else {
      return this.BULL_PEN_PATHS;
    }
  })

  constructor(private blanks: Signal<readonly BlankComponent[]>,
              private tiles: Signal<readonly TileComponent[]>,
              private puzzleType: PuzzleType) {
  }

  private tileAt(loc: number) {
    return this.tiles().filter(t => t.location === loc)[0];
  }

  private currentWord(): string {
    switch (this.puzzleType) {
      case "panama-canal": {
        let s = '';
        for (let i=0; i<12; i++) {
          const t = this.tileAt(i);
          s += t?.text() || ' ';
        }
        return s;
      }
      case "bull-pen": {
        let s = '';
        for (let i=0; i<7; i++) {
          const t = this.tileAt(i);
          s += t?.text() || ' ';
        }
        return s;
      }
    }
  }

  requestSlide(t: number) {
    if (this.complete()) return;
    const blank = this.blanks()[0];
    let path: Path | undefined;
    for (const p of this.paths()) {
      if (p.locations.indexOf(t) >= 0 && p.locations.indexOf(blank.location) >= 0) {
        path = p;
        break;
      }
    }
    if (path) {
      const tileIndex = path.locations.indexOf(t);
      const blankIndex = path.locations.indexOf(blank.location);
      // +ve means tile moving to the right, or down.
      const direction = (tileIndex - blankIndex) / Math.abs(tileIndex - blankIndex);
      let bi = blankIndex;
      while (bi !== tileIndex) {
        const newBlankIndex = bi + direction;
        this.tileAt(path.locations[newBlankIndex]).slideTo(path.locations[bi]);
        blank.teleportTo(path.locations[newBlankIndex]);
        bi = newBlankIndex;
      }
    }
    const s = this.currentWord();
    this.complete.set(s === "PANAMACANAL " || s === " 123456");
  }
}
