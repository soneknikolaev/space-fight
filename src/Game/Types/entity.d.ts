interface EntityBase {
  render(canvas: Canvas): void;
  onMove?(touch: TouchEngine, params: SystemParams): void;
  onPress?(touch: TouchEngine, params: SystemParams): void;
}

interface StaticBase {
  readonly isStatic: boolean;
  readonly id: string;
  getPosition(): Coordinate;
  getSize(): Size;
  setPosition(x: number, y: number): void;
  setSize(width: number, height: number): void;
}

interface PhysicBase extends StaticBase {
  private destroy(): void;
  isDestroyed: boolean;
}

interface PhysicEntity extends PhysicBase, EntityBase {}

interface StaticEntity extends StaticBase, EntityBase {}

type Entity = PhysicEntity | StaticEntity;
