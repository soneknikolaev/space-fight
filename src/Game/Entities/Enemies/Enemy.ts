import { Base } from '../Base';

export class Enemy extends Base implements IEntity {
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
    this.setPosition(x, y + this.params.translateOn);
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

export const isEnemy = (entity: IEntity): Boolean => entity instanceof Enemy;
