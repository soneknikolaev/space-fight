type GraphCanvasContextStyle = Partial<
  CanvasPathDrawingStyles &
    CanvasFillStrokeStyles &
    CanvasTextDrawingStyles & {
      gradient: Gradient;
    }
>;

type Coordinate = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type Canvas = {
  get(): HTMLCanvasElement;
  getContext(): CanvasRenderingContext2D;
  getSize(): Size;
  setContextStyles(styles: GraphCanvasContextStyle): void;
};

type CollisionPair = {
  bodyA: PhysicEntity;
  bodyB: PhysicEntity;
};

type Collision = {
  pairs: CollisionPair[];
};

type DispatchEvent = (event: GameEvent) => void;

type GameLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME';

type LevelConfig = {
  speed: number;
  procent: number;
};
