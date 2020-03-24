import { EngineConstructor, BoardConstructor, SnakeConstructor, FruitConstructor, Coordinate } from './types';
import Board from './board';
import Snake from './snake';
import Fruit from './fruit';

const SCALE = 20;
const SPEED = 10;
const MAX_SPEED = 25;

export default class Engine implements EngineConstructor {
  board: BoardConstructor;
  snake: SnakeConstructor;
  fruit: FruitConstructor;
  ctx: CanvasRenderingContext2D;
  currentTime = 0;
  lastTime: number = new Date().getTime();
  delta = 0;
  speed = SPEED;
  interval = 1000 / SPEED;

  constructor() {
    const canvas = document.getElementById('board') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const windowWidth: number = window.innerWidth;
    const windowHeight: number = window.innerHeight;

    this.ctx = ctx;
    this.board = new Board(ctx, windowWidth, windowHeight, SCALE);

    const initialPosition = {
      x: this.board.dimensions.width / 2 + this.board.dimensions.left - SCALE / 2,
      y: this.board.dimensions.height / 2 + this.board.dimensions.top - SCALE,
    };
    this.snake = new Snake(initialPosition, SCALE, 'snake');
    this.fruit = new Fruit(SCALE, 'food');

    this.board.fitToScreen();

    window.addEventListener('keydown', this._gamepad.bind(this));
  }

  _gamepad(event: KeyboardEvent): void {
    const direction = event.key.replace('Arrow', '').toUpperCase();
    this.snake.changeDirection(direction);
  }

  _generateRandomLocation(): Coordinate {
    const rows = this.board.dimensions.width / SCALE;
    const cols = this.board.dimensions.height / SCALE;
    const x = Math.floor(Math.random() * rows - 1) * SCALE + this.board.dimensions.left + SCALE;
    const y = Math.floor(Math.random() * cols - 1) * SCALE + this.board.dimensions.top + SCALE;

    return { x, y };
  }

  draw(): void {
    this.board.draw();

    this.fruit.draw((image, x, y, scale) => {
      this.ctx.drawImage(image, x, y, scale, scale);
    });

    this.snake.draw((image, x, y, scale) => {
      this.ctx.drawImage(image, x, y, scale, scale);
    });
  }

  interact(): void {
    if (this.snake.eat(this.fruit)) {
      const { x, y } = this._generateRandomLocation();
      this.snake.grow();
      this.fruit.pickLocation(x, y);
      this.speed = Math.min(MAX_SPEED, Math.max(SPEED, this.speed + 1));
      this.interval = 1000 / this.speed;
    }

    if (this.snake.die()) {
      this.snake.reset();
      this.speed = SPEED;
      this.interval = 1000 / SPEED;
    }
  }

  update(): void {
    requestAnimationFrame(this.update.bind(this));

    this.currentTime = new Date().getTime();
    this.delta = this.currentTime - this.lastTime;

    if (this.delta > this.interval) {
      // Draw the scenario
      this.draw();

      // Update positions
      this.snake.update(this.board.dimensions);
      this.fruit.update();

      // Interaction between objects
      this.interact();

      this.lastTime = this.currentTime - (this.delta % this.interval);
    }
  }

  run(): void {
    const { x, y } = this._generateRandomLocation();
    this.fruit.pickLocation(x, y);
    this.update();
  }
}
