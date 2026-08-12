export interface Path {
  orientation: Orientation;
  locations: number[];
}

export type PuzzleType = "panama-canal" | "bull-pen";

export type Orientation = "horizontal" | "vertical";
