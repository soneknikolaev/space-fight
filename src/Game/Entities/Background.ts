import random from 'lodash/random';
import sample from 'lodash/sample';
import map from 'lodash/map';

import { Base } from './Base';

type Star = Coordinate & { color: string; size: number };

const colors = ['#0000FF', '#FFFF00', '#FFA500', '#FF0000', '#a87bff', '#a6a8ff', '#ffa371'];

export class Background extends Base implements IEntity {
  readonly translateOn = 3;

  private stars?: Star[];

  render(canvas: Canvas) {
    const ctx = canvas.getContext();
    this.translate(ctx);
    const { width, height } = this.getSize();

    ctx.fillStyle = '#050506';
    ctx.fillRect(0, 0, width, height);

    this.renderStars(ctx);
  }

  private translate(ctx: CanvasRenderingContext2D) {
    const { x, y } = this.getPosition();
    const { height } = this.getSize();
    const isFinished = y >= height;
    const newY = isFinished ? -height : y + this.translateOn;

    ctx.translate(x, newY);
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
      color: sample(colors) || colors[0],
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
