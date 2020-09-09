import { PhysicBase } from './Base';

export class Shot extends PhysicBase implements IPhysicEntity {
  readonly shooter: IPhysicEntity;

  constructor(x: number, y: number, shooter: IPhysicEntity) {
    super(x, y);
    this.shooter = shooter;
    this.setSize(7, 2);
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

  private translate(canvas: Canvas) {
    const canvasSize = canvas.getSize();
    const { x, y } = this.getPosition();

    if (x < 0 || x > canvasSize.width) {
      this.destroy();
    }

    if (!this.isDestroyed) {
      this.setPosition(x + 20, y);
    }
  }
}
