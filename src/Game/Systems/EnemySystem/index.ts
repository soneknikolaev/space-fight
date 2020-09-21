import { LevelConfig } from './level';
import { space } from './spaces';
import { generate } from './generator';

let config = LevelConfig('EASY');

export const EnemySystem = (entities: IEntity[], { events, canvas }: SystemParams) => {
  for (const event of events) {
    if (event.type === 'level') {
      const { level } = event as LevelGameEvent;
      config = LevelConfig(level);
    }
  }

  const busyProcent = space.getBusyProcent(entities, canvas);

  if (busyProcent < config.procent) {
    const newSpace = space.getFreeSpace(entities, canvas);
    if (newSpace) {
      return [...entities, ...generate(canvas, newSpace, config)];
    }
  }

  return entities;
};
