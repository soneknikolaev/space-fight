import { generate } from './generator';
import { getBusySpaceInProcent } from './spaces';
import { LevelConfig } from './LevelConfig';

let config = LevelConfig('EASY');

export const EnemySystem = (entities: IEntity[], { events, canvas }: SystemParams) => {
  for (const event of events) {
    if (event.type === 'level') {
      const { level } = event as LevelGameEvent;
      config = LevelConfig(level);
    }
  }

  const busyProcent = getBusySpaceInProcent(entities, canvas);

  if (busyProcent < config.procent) {
    return [...entities, ...generate(entities, canvas, config)];
  }

  return entities;
};
