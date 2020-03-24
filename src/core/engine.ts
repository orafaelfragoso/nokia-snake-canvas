import { EngineConstructor, BoardConstructor, SnakeConstructor, FoodConstructor } from './types';
import Board from './board';
import Snake from './snake';
import Fruit from './fruit';

export default class Engine implements EngineConstructor {
  board: BoardConstructor;
  snake: SnakeConstructor;
  fruit: FoodConstructor;

  constructor() {
    const canvas = document.getElementById('board') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const scale = 20;
    const windowWidth: number = window.innerWidth;
    const windowHeight: number = window.innerHeight;

    this.board = new Board(ctx, windowWidth, windowHeight, scale);
    this.snake = new Snake(ctx, this.board.dimensions, scale);
    this.fruit = new Fruit(ctx, this.board.dimensions, scale);

    this.board.fitToScreen();

    window.addEventListener('keydown', this._gamepad.bind(this));
  }

  _gamepad(event: KeyboardEvent): void {
    const direction = event.key.replace('Arrow', '').toUpperCase();
    this.snake.changeDirection(direction);
  }

  update(): void {
    window.requestAnimationFrame(() => {
      this.board.draw();
      this.fruit.draw();
      this.snake.draw();

      if (this.snake.eat(this.fruit)) {
        this.snake.grow();
        this.fruit.pickLocation();
      }

      if (this.snake.die()) {
        this.snake.reset();
      }
    });
  }

  run(): void {
    this.fruit.pickLocation();
    setInterval(this.update.bind(this), 100);
  }
}
