import random from 'lodash/random';

type Star = Coordinate & { color: string; size: number };

const colors = ['#0000FF', '#FFFF00', '#FFA500', '#FF0000', '#a87bff', '#a6a8ff', '#ffa371'];
const TRANSLATE = 5;

export class Background implements Entity {
  private position: Coordinate = { x: 0, y: 0 };

  private stars?: Star[];

  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  render(canvas: Canvas) {
    const ctx = canvas.getContext();
    const size = canvas.getSize();
    const { width, height } = size;
    this.translate(size);

    ctx.fillStyle = '#000';
    ctx.translate(this.position.x, 0);
    ctx.fillRect(0, 0, width + 2 * TRANSLATE, height);

    if (!this.stars) this.stars = this.getStars(size);

    this.stars.forEach((star) => this.renderStar(ctx, star));
  }

  translate(size: Size) {
    const { x } = this.position;
    const { width } = size;

    const isFinished = x <= -width;
    const newX = isFinished ? width : x - TRANSLATE;
    this.position = { ...this.position, x: newX };

    if (isFinished) {
      this.stars = this.getStars(size);
    }
  }

  private getStars(size: Size) {
    const { width, height } = size;

    return [...new Array(random(20, 80))].map(() => ({
      x: random(0, width),
      y: random(0, height),
      size: random(1, 5),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }

  private renderStar(ctx: CanvasRenderingContext2D, { x, y, size, color }: Star) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}
