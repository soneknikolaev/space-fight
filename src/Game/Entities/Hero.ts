import { getImage } from 'Service/Images';

import { Physic } from './Base';

const hero = getImage('bird.svg');

export class Hero extends Physic implements PhysicEntity {
  private translateTo: Coordinate = { x: 0, y: 0 };

  constructor(x: number, y: number) {
    super(x, y);
    this.translateTo = this.getPosition();
    this.setSize(40, 30);
  }

  render(canvas: Canvas) {
    this.translate();
    const ctx = canvas.getContext();
    const { x, y } = this.getPosition();
    const { width, height } = this.getSize();

    ctx.drawImage(hero, x, y, width, height);
  }

  onMove(touch: CanvasTouchEvent) {
    const { canvas, position } = touch;
    const heroSize = this.getSize();
    const canvasSize = canvas.getSize();
    const width = heroSize.width / 2;
    const height = heroSize.height / 2;
    let { x, y } = position;

    const limitX = canvasSize.width - width;
    const limitY = canvasSize.height - height;

    if (x > limitX) {
      x = limitX;
    } else if (x < width) {
      x = width;
    }

    if (y > limitY) {
      y = limitY;
    } else if (y < height) {
      y = height;
    }

    const newX = Math.round(x - width);
    const newY = Math.round(y - height);

    this.translateTo = { x: newX, y: newY };
  }

  onPress(_touch: CanvasTouchEvent, params: SystemParams) {
    params.dispatch({
      type: 'shot',
      provider: this,
    });
  }

  private translate() {
    const STEP = 5;
    const { x, y } = this.getPosition();

    const deltaX = Math.abs(this.translateTo.x - x);
    const deltaY = Math.abs(this.translateTo.y - y);
    const stepX = Math.min(Math.max(deltaX / STEP, 10), deltaX);
    const stepY = Math.min(Math.max(deltaY / STEP, 10), deltaY);

    const newX = this.translateTo.x > x ? x + stepX : x - stepX;
    const newY = this.translateTo.y > y ? y + stepY : y - stepY;

    this.setPosition(newX, newY);
  }
}
