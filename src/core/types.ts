export interface Vector {
  x: number;
  y: number;
  scale: number;
  ctx: CanvasRenderingContext2D;
  dimensions: BoardDimension;
  draw: () => void;
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

export interface FoodConstructor extends Vector {
  image: CanvasImageSource;
  pickLocation: () => void;
}

export interface SnakeConstructor extends Vector {
  xSpeed: number;
  ySpeed: number;
  total: number;
  tail: Array<SnakeTail>;
  image: CanvasImageSource;
  direction: string;
  die: () => boolean;
  reset: () => void;
  eat: (food: FoodConstructor) => boolean;
  grow: () => void;
  changeDirection: (direction: string) => void;
}

export interface EngineConstructor {
  snake: SnakeConstructor;
  board: BoardConstructor;
  fruit: FoodConstructor;
}

export interface SnakeTail {
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
