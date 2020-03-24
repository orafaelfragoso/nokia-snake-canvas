import { BoardDimension, FruitConstructor, SnakeConstructor, Coordinate, DrawCallback } from './types';

export default class Snake implements SnakeConstructor {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  scale: number;
  image: CanvasImageSource;
  total: number;
  tail: Array<Coordinate>;
  direction = 'RIGHT';

  constructor(initialPosition: Coordinate, scale: number, image: string) {
    this.x = initialPosition.x;
    this.y = initialPosition.y;
    this.xSpeed = scale;
    this.ySpeed = 0;
    this.scale = scale;
    this.image = document.getElementById(image) as CanvasImageSource;
    this.total = 2;
    this.tail = [
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
    ];
  }

  update(dimensions: BoardDimension): void {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x >= dimensions.right) this.x = dimensions.left;
    if (this.x < dimensions.left) this.x = dimensions.right - this.scale;
    if (this.y >= dimensions.bottom) this.y = dimensions.top;
    if (this.y < dimensions.top) this.y = dimensions.bottom - this.scale;
  }

  draw(callback: DrawCallback): void {
    for (let i = 0; i < this.tail.length; i++) {
      callback(this.image, this.tail[i].x, this.tail[i].y, this.scale);
    }

    callback(this.image, this.x, this.y, this.scale);
  }

  die(): boolean {
    for (let i = 0; i < this.tail.length - 1; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        return true;
      }
    }

    return false;
  }

  reset(): void {
    this.total = 2;
    this.tail = [
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
    ];
  }

  eat(food: FruitConstructor): boolean {
    return this.x === food.x && this.y === food.y;
  }

  grow(): void {
    this.total++;
  }

  changeDirection(direction: string): void {
    switch (direction) {
      case 'UP':
        if (this.direction === 'DOWN') return;
        this.xSpeed = 0;
        this.ySpeed = -this.scale;
        break;
      case 'DOWN':
        if (this.direction === 'UP') return;
        this.xSpeed = 0;
        this.ySpeed = this.scale;
        break;
      case 'LEFT':
        if (this.direction === 'RIGHT') return;
        this.xSpeed = -this.scale;
        this.ySpeed = 0;
        break;
      case 'RIGHT':
        if (this.direction === 'LEFT') return;
        this.xSpeed = this.scale;
        this.ySpeed = 0;
        break;
      default:
        break;
    }

    this.direction = direction;
  }
}
