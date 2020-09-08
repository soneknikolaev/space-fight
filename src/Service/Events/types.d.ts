interface GameEventBase {
  type: string;
}

interface GameEvent extends GameEventBase {
  provider: Entity;
}
