class Fruit {
  public x: number
  public y: number
  public scale: number
  public ctx: CanvasRenderingContext2D
  public image: CanvasImageSource
  private dimensions: any

  constructor(ctx: CanvasRenderingContext2D, dimensions: any, scale: number) {
    this.ctx = ctx
    this.dimensions = dimensions
    this.scale = scale
    this.image = <CanvasImageSource> document.getElementById('food')
  }

  public pickLocation(): void {
    const rows = this.dimensions.width / this.scale
    const cols = this.dimensions.height / this.scale

    this.x = (Math.floor(Math.random() * rows - 1)) * this.scale + this.dimensions.padLeft + this.scale
    this.y = (Math.floor(Math.random() * cols - 1)) * this.scale + this.dimensions.padTop + this.scale

    console.log(this.dimensions)
    console.log(this.x, this.y)
  }

  public draw(): void {
    this.ctx.drawImage(this.image, this.x, this.y, this.scale, this.scale)
  }
}

export default Fruit
