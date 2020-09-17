import { PhysicBase } from '../Base';

export class Enemy extends PhysicBase implements IPhysicEntity {
  readonly translateOn: number;

  private readonly img: HTMLImageElement;

  private axis: number;

  private shift: number = 0;

  constructor(x: number, y: number, params: EnemyParams) {
    super(x, y);
    const {
      img,
      size: { width, height },
      speed,
    } = params;

    this.img = img;
    this.axis = y;
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
    // this.animate();
    const { x, y } = this.getPosition();

    if (x - this.getSize().width > 0) {
      const newX = x - this.translateOn;
      this.setPosition(newX, y);
    } else {
      this.destroy();
    }
  }

  setShift(shift: number) {
    this.shift = shift;
  }

  setAxis(axis: number) {
    this.axis = axis;
  }

  getAxis(): number {
    return this.axis;
  }

  private animate() {
    const { x, y } = this.getPosition();
    const isIncrement = this.shift > 0;
    let finalY = this.axis + this.shift;

    if ((isIncrement && y >= finalY) || (!isIncrement && y <= finalY)) {
      this.setShift(-this.shift);
      finalY = this.axis + this.shift;
    }

    const delta = finalY - y;
    if (delta === 0) return;

    let step = Math.min(this.translateOn / 2, Math.abs(delta));
    step = delta > 0 ? step : -step;

    this.setPosition(x, y + step);
  }

  get space(): ISpace {
    const { height } = this.getSize();
    const shift = Math.abs(this.shift);
    const padding = 2;

    return [this.axis - shift - padding, this.axis + shift + height + padding];
  }
}
