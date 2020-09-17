interface IEntityBase {
  render(canvas: Canvas): void;
  translate(canvas: Canvas): void;
  onMove?(touch: TouchEngine, params: SystemParams): void;
  onPress?(touch: TouchEngine, params: SystemParams): void;
}

interface IStaticBase {
  readonly isStatic: boolean;
  readonly id: string;
  getPosition(): Coordinate;
  getSize(): Size;
  setPosition(x: number, y: number): void;
  setSize(width: number, height: number): void;
}

interface IPhysicBase extends IStaticBase {
  destroy(): void;
  isDestroyed: boolean;
}

interface IPhysicEntity extends IPhysicBase, IEntityBase {}

interface IStaticEntity extends IStaticBase, IEntityBase {}

type IEntity = IPhysicEntity | IStaticEntity;

type ISpace = FixedLengthArray<[number, number]>;
