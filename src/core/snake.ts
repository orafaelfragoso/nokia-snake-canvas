class Snake {
  public x: number
  public y: number
  public xSpeed: number
  public ySpeed: number
  public scale: number
  public ctx: CanvasRenderingContext2D
  public image: CanvasImageSource

  private dimensions: any
  private total: number = 0
  private tail: Array<any> = []

  constructor(ctx: CanvasRenderingContext2D, dimensions: any, scale: number) {
    this.ctx = ctx
    this.dimensions = dimensions
    this.x = (dimensions.width / 2) + dimensions.padLeft - (scale / 2)
    this.y = (dimensions.height / 2) + dimensions.padTop - (scale / 2)
    this.xSpeed = scale
    this.ySpeed = 0
    this.scale = scale
    this.image = <CanvasImageSource> document.getElementById('snake')
  }

  public draw(): void {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1]
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y }

    this.x += this.xSpeed
    this.y += this.ySpeed

    if (this.x >= this.dimensions.padRight) this.x = this.dimensions.padLeft
    if (this.x < this.dimensions.padLeft) this.x = this.dimensions.padRight - this.scale
    if (this.y >= this.dimensions.padBottom) this.y = this.dimensions.padTop
    if (this.y < this.dimensions.padTop) this.y = this.dimensions.padBottom - this.scale

    for (let i = 0; i < this.tail.length; i++) {
      this.ctx.drawImage(this.image, this.tail[i].x, this.tail[i].y, this.scale, this.scale)
    }

    this.ctx.drawImage(this.image, this.x, this.y, this.scale, this.scale)
  }

  public eat(food: any): boolean {
    return this.x === food.x && this.y === food.y
  }

  public grow(): void {
    this.total++
  }

  public changeDirection(direction: string): void {
    switch (direction) {
      case 'UP':
        this.xSpeed = 0
        this.ySpeed = -this.scale
        break
      case 'DOWN':
        this.xSpeed = 0
        this.ySpeed = this.scale
        break
      case 'LEFT':
        this.xSpeed = -this.scale
        this.ySpeed = 0
        break
      case 'RIGHT':
        this.xSpeed = this.scale
        this.ySpeed = 0
        break
    }
  }
}

export default Snake
