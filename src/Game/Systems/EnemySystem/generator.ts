import filter from 'lodash/filter';
import random from 'lodash/random';
import sample from 'lodash/sample';

import { IEnemy, Enemy, enemies, createRandomShape } from '../../Entities';

const getParams = ([p0, p1]: ISpace, config: LevelConfig) => {
  const height = p1 - p0;
  const params = sample(filter(enemies, (enemy: EnemyParams) => height >= enemy.size.height));

  if (params) {
    return {
      ...params,
      speed: params.translateOn * config.speed,
    };
  }
};

export const generate = (canvas: Canvas, space: ISpace, config: LevelConfig): IEnemy[] => {
  if (Math.random() >= 0.2) return [];

  const params = getParams(space, config);

  if (!params) return [];

  const edge = canvas.getSize().width;

  if (Math.random() >= 0.5) {
    return [new Enemy(edge, random(space[0], space[1] - params.size.height), params)];
  }

  return createRandomShape(edge, space, params);
};
