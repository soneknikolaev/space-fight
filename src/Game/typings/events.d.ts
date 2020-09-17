interface EventBase {
  type: string;
}

interface CanvasTouchEvent extends EventBase {
  canvas: Canvas;
  position: Coordinate;
}

type ShotGameEvent = {
  type: 'shot';
  provider: Entity;
} & EventBase;

type LevelGameEvent = {
  type: 'level';
  level: GameLevel;
} & Event;

type GameEvent = ShotGameEvent | LevelGameEvent | GameEvent;
