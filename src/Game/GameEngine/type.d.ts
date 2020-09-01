type GraphCanvasContextStyle = Partial<
  CanvasPathDrawingStyles &
    CanvasFillStrokeStyles &
    CanvasTextDrawingStyles & {
      gradient: Gradient;
    }
>;

interface Entity {
  render(canvas: Canvas): void;
  onMove?(touch: TouchEngine): void;
}

type System = (entities: Entity[], touches: TouchEngine[]) => Entity[];

type Size = {
  width: number;
  height: number;
};

type Coordinate = {
  x: number;
  y: number;
};

type Canvas = {
  get(): HTMLCanvasElement;
  getContext(): CanvasRenderingContext2D;
  getSize(): Size;
  getRef(): React.RefObject<HTMLCanvasElement>;
  setContextStyles(styles: GraphCanvasContextStyle): void;
};

type TouchTypeEngine = 'move' | 'press';

type TouchEngine = {
  type: Type;
  position: Coordinate;
};

type TouchesHandlers = {
  add(touch: Touch): void;
  get(): Touch[];
  reset(): void;
};
