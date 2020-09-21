import { PhysicBase } from '../Base';

export class Enemy extends PhysicBase implements IPhysicEntity {
  public readonly params: EnemyParams;

  private lastShot: number | undefined;

  constructor(x: number, y: number, params: EnemyParams) {
    super(x, y);
    const { width, height } = params.size;

    this.params = params;
    this.setSize(width, height);
  }

  render(canvas: Canvas) {
    const ctx = canvas.getContext();
    const { x, y } = this.getPosition();
    const { width, height } = this.getSize();

    ctx.drawImage(this.params.img, x, y, width, height);
  }

  translate() {
    const { x, y } = this.getPosition();

    if (x - this.getSize().width > 0) {
      const newX = x - this.params.translateOn;
      this.setPosition(newX, y);
    } else {
      this.destroy();
    }
  }

  get space(): ISpace {
    const { height } = this.getSize();
    const { y } = this.getPosition();
    const padding = 5;

    return [y - padding, y + height + padding];
  }

  get canShot(): boolean {
    if (!this.params.single) return false;

    const now = performance.now();

    if (typeof this.lastShot === 'undefined' || now - this.lastShot >= 500) {
      this.lastShot = now;
      return true;
    }

    return false;
  }
}
