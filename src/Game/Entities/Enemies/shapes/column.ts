import random from 'lodash/random';

import { Enemy, IEnemy } from '../Enemy';

export const column = (params: EnemyParams, maxWidth: number): ShapeMethods => {
  const { width, height } = params.size;
  const gap = random(10, Math.round(height / 2));
  const minCount = 2;
  const maxCount = width < maxWidth ? 3 : 0;
  const count = random(minCount, maxCount);
  return {
    getWidth: (): number => width,
    getMaxCount: (): number => (maxCount >= minCount ? maxCount : 0),
    build: (x0: number, y0: number): IEnemy[] => {
      const enemies = [];

      for (let i = 0; i < count; i += 1) {
        const enemy = new Enemy(x0, y0, params);
        const { x, y } = enemy.getPosition();
        const { height } = enemy.getSize();
        enemy.setPosition(x, y + (height + gap) * i - height * (count - i));
        enemies.push(enemy);
      }

      return enemies;
    },
  };
};
