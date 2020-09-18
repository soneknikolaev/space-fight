import { PhysicBase } from '../Base';

export class Enemy extends PhysicBase implements IPhysicEntity {
  readonly translateOn: number;

  private readonly img: HTMLImageElement;

  constructor(x: number, y: number, params: EnemyParams) {
    super(x, y);
    const {
      img,
      size: { width, height },
      speed,
    } = params;

    this.img = img;
    this.translateOn = speed;
    this.setSize(width, height);
  }

  render(canvas: Canvas) {
    const ctx = canvas.getContext();
    const { x, y } = this.getPosition();
    const { width, height } = this.getSize();

    ctx.drawImage(this.img, x, y, width, height);
  }

  translate() {
    const { x, y } = this.getPosition();

    if (x - this.getSize().width > 0) {
      const newX = x - this.translateOn;
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
}
