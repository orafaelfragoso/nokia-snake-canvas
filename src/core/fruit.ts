import { BoardDimension, FoodConstructor } from './types';

export default class Fruit implements FoodConstructor {
  x: number;
  y: number;
  scale: number;
  ctx: CanvasRenderingContext2D;
  image: CanvasImageSource;
  dimensions: BoardDimension;

  constructor(ctx: CanvasRenderingContext2D, dimensions: BoardDimension, scale: number) {
    this.ctx = ctx;
    this.dimensions = dimensions;
    this.scale = scale;
    this.image = document.getElementById('food') as CanvasImageSource;
  }

  pickLocation(): void {
    const rows = this.dimensions.width / this.scale;
    const cols = this.dimensions.height / this.scale;

    this.x = Math.floor(Math.random() * rows - 1) * this.scale + this.dimensions.left + this.scale;
    this.y = Math.floor(Math.random() * cols - 1) * this.scale + this.dimensions.top + this.scale;
  }

  draw(): void {
    this.ctx.drawImage(this.image, this.x, this.y, this.scale, this.scale);
  }
}
