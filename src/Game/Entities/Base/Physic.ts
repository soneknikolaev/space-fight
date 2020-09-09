import { Base } from './Base';

export class PhysicBase extends Base implements IPhysicBase {
  private destroyed: boolean = false;

  constructor(x: number, y: number) {
    super(x, y, false);
  }

  destroy() {
    this.destroyed = true;
  }

  get isDestroyed() {
    return this.destroyed;
  }
}
