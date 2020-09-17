import concat from 'lodash/concat';

import { LevelConfig } from './level';
import { space } from './spaces';
import { generate } from './generator';

let config = LevelConfig('EASY');

export const EnemySystem = (entities: IEntity[], { events, canvas }: SystemParams) => {
  for (const event of events) {
    if (event.type === 'level') {
      config = LevelConfig(event.level);
    }
  }

  const busyProcent = space.getBusyProcent(entities, canvas);

  if (busyProcent < config.procent) {
    const spaces = space.getWithoutEnemies(entities, canvas);

    return concat(entities, generate(canvas, spaces, config));
  }

  return entities;
};
