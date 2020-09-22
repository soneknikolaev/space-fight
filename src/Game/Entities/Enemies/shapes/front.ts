import random from 'lodash/random';

import { Enemy, IEnemy } from '../Enemy';

export const front = (params: EnemyParams, maxHeight: number): ShapeMethods => {
  const gap = random(10, params.size.height);
  const minCount = 2;
  const maxCount = Math.min(3, Math.floor(maxHeight / (params.size.height + gap)));
  const count = random(minCount, maxCount);
  return {
    getHeight: (): number => count * (params.size.height + gap),
    getMaxCount: (): number => (maxCount >= minCount ? maxCount : 0),
    build: (x0: number, y0: number): IEnemy[] => {
      const enemies = [];

      for (let i = 0; i < count; i += 1) {
        const enemy = new Enemy(x0, y0, params);
        const { x, y } = enemy.getPosition();
        const { height } = enemy.getSize();
        enemy.setPosition(x, y + (height + gap) * i);
        enemies.push(enemy);
      }
      return enemies;
    },
  };
};
