import { BoardDimension, FoodConstructor, SnakeConstructor, SnakeTail } from './types';

export default class Snake implements SnakeConstructor {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  scale: number;
  ctx: CanvasRenderingContext2D;
  image: CanvasImageSource;
  dimensions: BoardDimension;
  total = 2;
  tail: Array<SnakeTail> = [];
  direction = 'RIGHT';

  constructor(ctx: CanvasRenderingContext2D, dimensions: BoardDimension, scale: number) {
    this.ctx = ctx;
    this.dimensions = dimensions;
    this.x = dimensions.width / 2 + dimensions.left - scale / 2;
    this.y = dimensions.height / 2 + dimensions.top - scale / 2;
    this.xSpeed = scale;
    this.ySpeed = 0;
    this.scale = scale;
    this.image = document.getElementById('snake') as CanvasImageSource;
  }

  draw(): void {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x >= this.dimensions.right) this.x = this.dimensions.left;
    if (this.x < this.dimensions.left) this.x = this.dimensions.right - this.scale;
    if (this.y >= this.dimensions.bottom) this.y = this.dimensions.top;
    if (this.y < this.dimensions.top) this.y = this.dimensions.bottom - this.scale;

    for (let i = 0; i < this.tail.length; i++) {
      this.ctx.drawImage(this.image, this.tail[i].x, this.tail[i].y, this.scale, this.scale);
    }

    this.ctx.drawImage(this.image, this.x, this.y, this.scale, this.scale);
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
    this.tail = [];
  }

  eat(food: FoodConstructor): boolean {
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
