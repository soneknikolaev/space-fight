import random from 'lodash/random';

import { Enemy, IEnemy } from '../Enemy';

export const inclined = (params: EnemyParams, maxWidth: number): ShapeMethods => {
  const { width } = params.size;
  const gap = random(10, Math.round(width / 2));
  const minCount = 2;
  const maxCount = Math.min(3, Math.floor(maxWidth / (width + gap)));
  const count = random(minCount, maxCount);

  return {
    getWidth: (): number => count * (width + gap),
    getMaxCount: (): number => (maxCount >= minCount ? maxCount : 0),
    build: (x0: number, y0: number): IEnemy[] => {
      const enemies = [];
      const shift = random(5, 20);
      let shiftByY = 0;

      for (let i = 0; i < count; i += 1) {
        const enemy = new Enemy(x0, y0, params);
        const { x, y } = enemy.getPosition();
        const { width } = enemy.getSize();
        enemy.setPosition(x + (width + gap) * i, y - shiftByY);
        enemies.push(enemy);

        shiftByY += shift;
      }
      return enemies;
    },
  };
};
