import { Physic } from './Base';

export class Shot extends Physic implements PhysicEntity {
  constructor(x: number, y: number) {
    super(x, y);
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
