type IEntity = {
  readonly isStatic: boolean;
  readonly id: string;
  getPosition(): Coordinate;
  getSize(): Size;
  setPosition(x: number, y: number): void;
  setSize(width: number, height: number): void;
  render(canvas: Canvas): void;
};

type ISpace = FixedLengthArray<[number, number]>;
