import filter from 'lodash/filter';
import random from 'lodash/random';
import sample from 'lodash/sample';

import { spaces } from './spaces';

import { IEnemy, Enemy, enemiesParams, createRandomShape } from '../../Entities';

const getParams = ([p0, p1]: ISpace, config: LevelConfig) => {
  const width = p1 - p0;
  const params = sample(filter(enemiesParams, (enemy: EnemyParams) => width >= enemy.size.width));

  if (params) {
    return {
      ...params,
      speed: params.translateOn * config.speed,
    };
  }
};

export const generate = (entities: IEntity[], canvas: Canvas, config: LevelConfig): IEnemy[] => {
  if (Math.random() >= 0.2) return [];

  const space = spaces.getFree(entities, canvas);
  if (!space) return [];

  const params = getParams(space, config);

  if (!params) return [];

  if (Math.random() >= 0.5) {
    return [new Enemy(random(space[0], space[1] - params.size.width), 0, params)];
  }

  return createRandomShape(0, space, params);
};
