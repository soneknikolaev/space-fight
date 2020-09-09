import { getImage } from 'Service/Images';

import { PhysicBase } from './Base';

const enemy = getImage('enemy1.svg');

export class Enemy extends PhysicBase implements IPhysicEntity {
  constructor(x: number, y: number) {
    super(x, y);
    this.setSize(20, 30);
  }

  render(canvas: Canvas) {
    this.translate();
    const ctx = canvas.getContext();
    const { x, y } = this.getPosition();
    const { width, height } = this.getSize();

    ctx.drawImage(enemy, x, y, width, height);
  }

  private translate() {
    const { x, y } = this.getPosition();

    x > 0 ? this.setPosition(x - 5, y) : this.destroy();
  }
}
