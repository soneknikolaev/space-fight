import random from 'lodash/random';
import map from 'lodash/map';

import { Base } from './Base';

type Star = Coordinate & { color: string; size: number };

const colors = ['#0000FF', '#FFFF00', '#FFA500', '#FF0000', '#a87bff', '#a6a8ff', '#ffa371'];

export class Background extends Base implements IEntityBase {
  readonly translateOn = 10;

  private stars?: Star[];

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, false);

    this.setSize(width, height);
  }

  render(canvas: Canvas) {
    const ctx = canvas.getContext();
    const { width, height } = this.getSize();
    this.translate();

    ctx.fillStyle = '#000';
    ctx.translate(this.getPosition().x, 0);
    ctx.fillRect(0, 0, width + 2 * this.translateOn, height);
    this.renderStars(ctx);
  }

  private translate() {
    const { x, y } = this.getPosition();
    const { width } = this.getSize();
    const isFinished = x <= -width;
    const newX = isFinished ? width : x - this.translateOn;

    this.setPosition(newX, y);

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
