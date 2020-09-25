import { Base } from './Base';
import { isHero } from './Hero';

export class Bullet extends Base implements IEntity {
  readonly shooter: IEntity;

  readonly translateOn: number;

  readonly color: string;

  constructor(shooter: IEntity) {
    super(0, 0);
    this.shooter = shooter;
    this.translateOn = isHero(shooter) ? -20 : 20;
    this.color = isHero(shooter) ? '#D09BFF' : '#FF6347';
    this.setSize(2, 10);
    this.initPosition();
  }

  initPosition() {
    const shooterSize = this.shooter.getSize();
    const { x, y } = this.shooter.getPosition();
    const { width, height } = this.getSize();

    this.setPosition(
      x + shooterSize.width / 2 - width,
      y + (this.translateOn > 0 ? shooterSize.height + height : -shooterSize.height / 2)
    );
  }

  render(canvas: Canvas) {
    const ctx = canvas.getContext();
    const { x, y } = this.getPosition();
    const { width, height } = this.getSize();

    ctx.fillStyle = `${this.color}`;
    ctx.fillRect(x, y, width, height);
  }

  translate() {
    const { x, y } = this.getPosition();
    this.setPosition(x, y + this.translateOn);
  }
}

export const isBullet = (entity: IEntity): boolean => entity instanceof Bullet;
