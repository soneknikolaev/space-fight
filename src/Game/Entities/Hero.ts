import { getImage } from 'Service/Images';

import { Base } from './Base';

const hero = getImage('bird.svg');

export class Hero extends Base implements IEntity {
  private readonly STEPS = 5;

  private translateTo: Coordinate = { x: 0, y: 0 };

  private rendersAfterShot: number = 0;

  constructor(x: number, y: number) {
    super(x, y);
    this.setSize(35, 50);
    this.translateTo = this.getPosition();
  }

  render(canvas: Canvas) {
    const ctx = canvas.getContext();
    const { x, y } = this.getPosition();
    const { width, height } = this.getSize();

    ctx.drawImage(hero, x, y, width, height);
    this.translate();

    this.rendersAfterShot += 1;
  }

  setTranslateTo(x: number, y: number) {
    this.translateTo = { x, y };
  }

  translate() {
    const { x: x0, y: y0 } = this.getPosition();
    const { x: x1, y: y1 } = this.translateTo;

    const deltaX = Math.abs(x1 - x0);
    const deltaY = Math.abs(y1 - y0);
    const stepX = Math.min(Math.max(deltaX / this.STEPS, 10), deltaX);
    const stepY = Math.min(Math.max(deltaY / this.STEPS, 10), deltaY);

    const newX = x1 > x0 ? x0 + stepX : x0 - stepX;
    const newY = y1 > y0 ? y0 + stepY : y0 - stepY;

    this.setPosition(newX, newY);
  }

  get canShot(): boolean {
    if (this.rendersAfterShot >= 5) {
      this.rendersAfterShot = 0;
      return true;
    }

    return false;
  }
}

export const isHero = (entity: IEntity): boolean => entity instanceof Hero;
