import { v4 as uuidv4 } from 'uuid';

import { LogicException } from 'Service/Exception';

export class Base implements IEntity {
  readonly isStatic: boolean;

  readonly id: string;

  private position: Coordinate = { x: 0, y: 0 };

  private size: Size = { width: 0, height: 0 };

  constructor(x: number, y: number, isStatic: boolean | undefined = false) {
    this.position = { x, y };
    this.id = uuidv4();
    this.isStatic = isStatic;
  }

  getPosition(): Coordinate {
    return this.position;
  }

  getSize(): Size {
    return this.size;
  }

  setPosition(x: number, y: number) {
    this.position = { x, y };
  }

  setSize(width: number, height: number) {
    this.size = { width, height };
  }

  render(_canvas: Canvas) {
    throw new LogicException(`The method render is not implemented at ${this.constructor.name}`);
  }
}
