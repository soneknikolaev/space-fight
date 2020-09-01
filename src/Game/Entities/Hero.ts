import { getImage } from 'Service/Images';

const hero = getImage('bird.svg');

export class Hero implements Entity {
  private size: Size = {
    width: 40,
    height: 30,
  };

  private translateTo: Coordinate = { x: 0, y: 0 };

  private position: Coordinate = { x: 0, y: 0 };

  constructor(x: number, y: number) {
    this.position = this.fixPosition(x, y);
    this.translateTo = this.position;
  }

  render(canvas: Canvas) {
    this.translate();
    const ctx = canvas.getContext();
    const { x, y } = this.position;
    const { width, height } = this.size;

    ctx.drawImage(hero, x, y, width, height);
  }

  onMove(touch: TouchEngine) {
    this.translateTo = this.fixPosition(touch.position.x, touch.position.y);
  }

  private translate() {
    const STEP = 5;
    const { x, y } = this.position;

    const deltaX = Math.abs(this.translateTo.x - x);
    const deltaY = Math.abs(this.translateTo.y - y);
    const stepX = Math.min(Math.max(deltaX / STEP, 10), deltaX);
    const stepY = Math.min(Math.max(deltaY / STEP, 10), deltaY);

    const newX = this.translateTo.x > x ? x + stepX : x - stepX;
    const newY = this.translateTo.y > y ? y + stepY : y - stepY;

    this.position = { x: Math.round(newX), y: Math.round(newY) };
  }

  private fixPosition(x: number, y: number): Coordinate {
    const { width, height } = this.size;

    return {
      x: Math.round(x - width / 2),
      y: Math.round(y - height / 2),
    };
  }
}
