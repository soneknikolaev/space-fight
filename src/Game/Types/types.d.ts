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
  getRef(): React.RefObject<HTMLCanvasElement>;
  setContextStyles(styles: GraphCanvasContextStyle): void;
};

interface CanvasTouchEvent extends GameEventBase {
  canvas: Canvas;
  position: Coordinate;
}

type CollisionPair = {
  bodyA: PhysicEntity;
  bodyB: PhysicEntity;
};

type Collision = {
  pairs: CollisionPair[];
};
