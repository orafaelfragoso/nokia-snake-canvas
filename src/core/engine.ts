import Board from './board'
import Snake from './snake'
import Fruit from './fruit'

class Engine {
  private board: Board
  private snake: Snake
  private fruit: Fruit

  constructor() {
    const canvas = <HTMLCanvasElement> document.getElementById('board')
    const ctx = <CanvasRenderingContext2D> canvas.getContext('2d')
    const scale: number = 20
    const windowWidth: number = window.innerWidth
    const windowHeight: number = window.innerHeight

    this.board = new Board(ctx, windowWidth, windowHeight, scale)
    this.snake = new Snake(ctx, this.board.dimensions, scale)
    this.fruit = new Fruit(ctx, this.board.dimensions, scale)

    this.board.fitToScreen()

    window.addEventListener('keydown', this.gamepad.bind(this))
  }

  private gamepad(event: KeyboardEvent): void {
    const direction = event.key.replace('Arrow', '').toUpperCase()
    this.snake.changeDirection(direction)
  }

  private update(): void {
    window.requestAnimationFrame(() => {
      this.board.draw()
      this.fruit.draw()
      this.snake.draw()

      if (this.snake.eat(this.fruit)) {
        this.snake.grow()
        this.fruit.pickLocation()
      }
    })
  }

  public run(): void {
    this.fruit.pickLocation()

    setInterval(this.update.bind(this), 100)
  }
}

export default Engine
