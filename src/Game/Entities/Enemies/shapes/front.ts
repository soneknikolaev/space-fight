import random from 'lodash/random';

import { Enemy } from '../Enemy';

export const front = (params: EnemyParams, maxWidth: number): ShapeMethods => {
  const { width } = params.size;
  const gap = random(10, Math.round(width / 2));
  const minCount = 2;
  const maxCount = Math.min(3, Math.floor(maxWidth / (width + gap)));
  const count = random(minCount, maxCount);
  return {
    getWidth: (): number => count * (width + gap),
    getMaxCount: (): number => (maxCount >= minCount ? maxCount : 0),
    build: (x0: number, y0: number): Enemy[] => {
      const enemies = [];

      for (let i = 0; i < count; i += 1) {
        const enemy = new Enemy(x0, y0, params);
        const { x, y } = enemy.getPosition();
        const { width, height } = enemy.getSize();
        enemy.setPosition(x + (width + gap) * i, y - height);
        enemies.push(enemy);
      }
      return enemies;
    },
  };
};
