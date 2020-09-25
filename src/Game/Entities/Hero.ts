import { getImage } from 'Service/Images';

import { Base } from './Base';

const hero = getImage('bird.svg');

export class Hero extends Base implements IEntity {
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

    this.rendersAfterShot += 1;
  }

  setTranslateTo(x: number, y: number) {
    this.translateTo = { x, y };
  }

  translate() {
    const STEPS = 5;
    const { x, y } = this.getPosition();

    const deltaX = Math.abs(this.translateTo.x - x);
    const deltaY = Math.abs(this.translateTo.y - y);
    const stepX = Math.min(Math.max(deltaX / STEPS, 10), deltaX);
    const stepY = Math.min(Math.max(deltaY / STEPS, 10), deltaY);

    const newX = this.translateTo.x > x ? x + stepX : x - stepX;
    const newY = this.translateTo.y > y ? y + stepY : y - stepY;

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
