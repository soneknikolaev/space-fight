interface EventBase {
  type: string;
}

interface CanvasTouchEvent extends EventBase {
  position: Coordinate;
}

type LevelGameEvent = {
  type: 'level';
  level: GameLevel;
} & Event;

type IGameEvent = LevelGameEvent | EventBase;
