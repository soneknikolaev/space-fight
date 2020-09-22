import { PhysicBase } from '../Base';

export interface IEnemy extends IPhysicEntity {
  readonly params: EnemyParams;
  space: ISpace;
  canShot: boolean;
}

export class Enemy extends PhysicBase implements IEnemy {
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

  translate(canvas: Canvas) {
    const { x, y } = this.getPosition();
    if (y < canvas.getSize().height) {
      const newY = y + this.params.translateOn;
      this.setPosition(x, newY);
    } else {
      this.destroy();
    }
  }

  get space(): ISpace {
    const { width } = this.getSize();
    const { x } = this.getPosition();
    const padding = 5;

    return [x - padding, x + width + padding];
  }

  get canShot(): boolean {
    const now = performance.now();

    if (typeof this.lastShot === 'undefined' || now - this.lastShot >= 500) {
      this.lastShot = now;
      return true;
    }

    return false;
  }
}
