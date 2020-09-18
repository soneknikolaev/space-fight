type SystemParams = {
  time: number;
  touches: CanvasTouchEvent[];
  events: IGameEvent[];
  dispatch: (event: IGameEvent) => void;
  canvas: Canvas;
};

type System = (entities: Entity[], params: SystemParams) => Entity[];
