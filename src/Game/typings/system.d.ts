type SystemParams = {
  time: number;
  touches: CanvasTouchEvent[];
  events: GameEvent[];
  dispatch: (event: GameEvent) => void;
  canvas: Canvas;
};

type System = (entities: Entity[], params: SystemParams) => Entity[];
