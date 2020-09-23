import random from 'lodash/random';
import map from 'lodash/map';

import { Base } from './Base';

type Star = Coordinate & { color: string; size: number };

const colors = ['#0000FF', '#FFFF00', '#FFA500', '#FF0000', '#a87bff', '#a6a8ff', '#ffa371'];

export class Background extends Base implements IEntityBase {
  readonly translateOn = 3;

  private stars?: Star[];

  constructor(x: number, y: number) {
    super(x, y, false);
  }

  render(canvas: Canvas) {
    const ctx = canvas.getContext();
    const { width, height } = this.getSize();

    ctx.fillStyle = '#050506';
    ctx.translate(0, this.getPosition().y - this.translateOn);
    ctx.fillRect(0, 0, width, height + 2 * this.translateOn);
    this.renderStars(ctx);
  }

  translate() {
    const { x, y } = this.getPosition();
    const { height } = this.getSize();
    const isFinished = y >= height;
    const newY = isFinished ? -height : y + this.translateOn;

    this.setPosition(x, newY);

    if (isFinished) {
      this.stars = this.getStars();
    }
  }

  private getStars() {
    const { width, height } = this.getSize();

    return map([...new Array(random(20, 80))], () => ({
      x: random(0, width),
      y: random(0, height),
      size: random(1, 5),
      color: colors[random(0, colors.length - 1)],
    }));
  }

  private renderStars(ctx: CanvasRenderingContext2D) {
    if (!this.stars) this.stars = this.getStars();

    for (const { x, y, size, color } of this.stars) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}
