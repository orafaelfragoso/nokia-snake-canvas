export interface Vector {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  scale: number;
  update: (dimensions?: BoardDimension) => void;
  draw: (callback: DrawCallback) => void;
}

export interface BoardConstructor {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  dimensions: BoardDimension;
  draw: () => void;
  fitToScreen: () => void;
  clear: () => void;
}

export type DrawCallback = (image: CanvasImageSource, x: number, y: number, scale: number) => void;

export interface FruitConstructor extends Vector {
  image: CanvasImageSource;
  pickLocation: (x: number, y: number) => void;
}

export interface SnakeConstructor extends Vector {
  total: number;
  tail: Array<Coordinate>;
  image: CanvasImageSource;
  direction: string;
  die: () => boolean;
  reset: () => void;
  eat: (food: FruitConstructor) => boolean;
  grow: () => void;
  changeDirection: (direction: string) => void;
}

export interface EngineConstructor {
  snake: SnakeConstructor;
  board: BoardConstructor;
  fruit: FruitConstructor;
  ctx: CanvasRenderingContext2D;
  currentTime: number;
  lastTime: number;
  delta: number;
  speed: number;
  interval: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface BoardDimension {
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
  readonly right: number;
}
