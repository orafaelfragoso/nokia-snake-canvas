import { BoardDimension, BoardConstructor } from './types';

export default class Board implements BoardConstructor {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  scale: number;
  dimensions: BoardDimension;

  constructor(canvas: CanvasRenderingContext2D, width: number, height: number, scale: number) {
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.ctx = canvas;
    this.dimensions = this._getDimensions();
  }

  _getDimensions(): BoardDimension {
    let canvasWidth: number = this.width;
    let canvasHeight: number = this.height;
    let maxSize: number = Math.max(canvasWidth, canvasHeight);

    while (maxSize > 0) {
      if (canvasWidth % this.scale === 0 && canvasHeight % this.scale === 0) {
        break;
      } else {
        if (canvasWidth % this.scale !== 0) {
          canvasWidth--;
        }

        if (canvasHeight % this.scale !== 0) {
          canvasHeight--;
        }

        maxSize--;
      }
    }

    const top: number = (this.height - canvasHeight) / 2;
    const left: number = (this.width - canvasWidth) / 2;

    return {
      width: canvasWidth,
      height: canvasHeight,
      top,
      left,
      right: left + canvasWidth,
      bottom: top + canvasHeight,
    };
  }

  draw(): void {
    const top: number = (this.height - this.dimensions.height) / 2;
    const left: number = (this.width - this.dimensions.width) / 2;
    const image = document.getElementById('tile') as CanvasImageSource;

    const xEnd: number = left + this.dimensions.width;
    const yEnd: number = top + this.dimensions.height;

    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let x = left; x < xEnd; x += this.scale) {
      for (let y = top; y < yEnd; y += this.scale) {
        this.ctx.drawImage(image, x, y, this.scale, this.scale);
      }
    }
  }

  fitToScreen(): void {
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
