import random from 'lodash/random';

import { Enemy, IEnemy } from '../Enemy';

export const column = (params: EnemyParams, maxHeight: number): ShapeMethods => {
  const gap = random(10, params.size.height);
  const minCount = 2;
  const maxCount = params.size.height < maxHeight ? 3 : 0;
  const count = random(minCount, maxCount);
  return {
    getHeight: (): number => params.size.height,
    getMaxCount: (): number => (maxCount >= minCount ? maxCount : 0),
    build: (x0: number, y0: number): IEnemy[] => {
      const enemies = [];

      for (let i = 0; i < count; i += 1) {
        const enemy = new Enemy(x0, y0, params);
        const { x, y } = enemy.getPosition();
        const { width } = enemy.getSize();
        enemy.setPosition(x + (width + gap) * i, y);
        enemies.push(enemy);
      }

      return enemies;
    },
  };
};
