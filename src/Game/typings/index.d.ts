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
};

type CollisionPair = FixedLengthArray<[IEntity, IEntity]>;

type Collision = {
  pairs: CollisionPair[];
};

type DispatchEvent = (event: IGameEvent) => void;

type GameLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME';

type LevelConfig = {
  speed: number;
  procent: number;
};
