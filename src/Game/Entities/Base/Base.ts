import { v4 as uuidv4 } from 'uuid';

export class Base implements IStaticBase {
  readonly isStatic: boolean;

  readonly id: string;

  private position: Coordinate = { x: 0, y: 0 };

  private size: Size = { width: 0, height: 0 };

  constructor(x: number, y: number, isStatic: boolean = true) {
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
}
