import random from 'lodash/random';
import reduce from 'lodash/reduce';

import { Enemy, IEnemy } from '../Enemy';

export const triangle = (params: EnemyParams, maxHeight: number): ShapeMethods => {
  const gap = random(10, params.size.height);
  const minCount = 3;
  const maxCount = Math.min(9, Math.floor(maxHeight / (params.size.height + gap)));
  const count = random(minCount, maxCount);
  const lines: number[] = [];
  let sum = 0;
  let i = 1;

  while (sum < count) {
    lines.push(i);
    sum = reduce(lines, (acc, i) => acc + i, 0);
    i = Math.min(i + 1, count - sum);
  }

  const max = Math.max(...lines);

  return {
    getHeight: (): number => max * (params.size.height + gap),
    getMaxCount: (): number => (maxCount >= minCount ? maxCount : 0),
    build: (x0: number, y0: number): IEnemy[] => {
      const enemies = [];
      for (let i = 0; i <= lines.length; i += 1) {
        const line = lines[i];
        for (let j = 0; j <= line; j += 1) {
          const enemy = new Enemy(x0, y0, params);
          const delta = max - line;
          const padding = ((gap + enemy.getSize().height) * delta) / 2;
          const { x, y } = enemy.getPosition();
          const { height, width } = enemy.getSize();
          enemy.setPosition(x + (width + gap) * i, y + (height + gap) * j + padding);
          enemies.push(enemy);
        }
      }
      return enemies;
    },
  };
};
