import { PhysicBase } from './Base';

type Direction = 'up' | 'down';
export class Bullet extends PhysicBase implements IPhysicEntity {
  readonly shooter: IPhysicEntity;

  readonly translateOn: number;

  constructor(shooter: IPhysicEntity, direction: Direction) {
    super(0, 0);
    this.shooter = shooter;
    this.translateOn = direction === 'down' ? 10 : -10;
    this.setSize(2, 10);
    this.initPosition();
  }

  initPosition() {
    const shooterSize = this.shooter.getSize();
    const { x, y } = this.shooter.getPosition();

    const { width, height } = this.getSize();
    const w = shooterSize.width + width;
    const h = shooterSize.height + height;
    this.setPosition(x + (this.translateOn > 0 ? w : -w), y + shooterSize.height / 2 - height);

    this.setPosition(x + shooterSize.width / 2 - width, y + (this.translateOn > 0 ? h : -h));
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

    if (y < 0 || y > canvasSize.height) {
      this.destroy();
    }

    if (!this.isDestroyed) {
      this.setPosition(x, y + this.translateOn);
    }
  }
}
