import { FruitConstructor, DrawCallback } from './types';

export default class Fruit implements FruitConstructor {
  x: number;
  y: number;
  xSpeed = 0;
  ySpeed = 0;
  scale: number;
  image: CanvasImageSource;

  constructor(scale: number, image: string) {
    this.scale = scale;
    this.image = document.getElementById(image) as CanvasImageSource;
  }

  pickLocation(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  update(): void {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  draw(callback: DrawCallback): void {
    callback(this.image, this.x, this.y, this.scale);
  }
}
