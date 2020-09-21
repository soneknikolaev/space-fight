import { PhysicBase } from './Base';

type Direction = 'left' | 'right';
export class Bullet extends PhysicBase implements IPhysicEntity {
  readonly shooter: IPhysicEntity;

  readonly translateOn: number;

  constructor(shooter: IPhysicEntity, direction: Direction) {
    super(0, 0);
    this.shooter = shooter;
    this.translateOn = direction === 'right' ? 10 : -10;
    this.setSize(10, 2);
    this.initPosition();
  }

  initPosition() {
    const shooterSize = this.shooter.getSize();
    const { x, y } = this.shooter.getPosition();

    const { width, height } = this.getSize();
    const w = shooterSize.width + width;
    this.setPosition(x + (this.translateOn > 0 ? w : -w), y + shooterSize.height / 2 - height);
  }

  render(canvas: Canvas) {
    this.translate(canvas);
    const ctx = canvas.getContext();
    const { x, y } = this.getPosition();
    const { width, height } = this.getSize();

    ctx.fillStyle = '#FF6347';
    ctx.rect(x, y, width, height);

    ctx.fill();
  }

  translate(canvas: Canvas) {
    const canvasSize = canvas.getSize();
    const { x, y } = this.getPosition();

    if (x < 0 || x > canvasSize.width) {
      this.destroy();
    }

    if (!this.isDestroyed) {
      this.setPosition(x + this.translateOn, y);
    }
  }
}
