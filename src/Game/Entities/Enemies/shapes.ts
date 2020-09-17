import clone from 'lodash/clone';
import reduce from 'lodash/reduce';

import { Enemy } from './Enemy';

const gap = 15;

export const shapes = {
  line: (enemy: EnemyParams, count: number) => ({
    getHeight: (): number => enemy.size.height,
    build: (enemy: Enemy): Enemy[] => {
      const enemies = [];

      for (let i = 0; i < count; i += 1) {
        const newEnemy = clone(enemy);
        const { x, y } = enemy.getPosition();
        const { width } = newEnemy.getSize();
        newEnemy.setPosition(x + (width + gap) * i, y);
        enemies.push(newEnemy);
      }

      return enemies;
    },
  }),
  wall: (enemy: EnemyParams, count: number) => ({
    getHeight: (): number => count * (enemy.size.height + gap),
    build: (enemy: Enemy): Enemy[] => {
      const enemies = [];

      for (let i = 0; i < count; i += 1) {
        const newEnemy = clone(enemy);
        const { x, y } = enemy.getPosition();
        const { height } = newEnemy.getSize();
        const axis = y + (height + gap) * i;
        newEnemy.setPosition(x, axis);
        newEnemy.setAxis(axis);
        enemies.push(newEnemy);
      }
      return enemies;
    },
  }),
  triangle: (enemy: EnemyParams, count: number) => {
    const lines: number[] = [];
    let sum = 0;
    let i = 1;

    while (sum < count) {
      lines.push(i);
      sum = reduce(lines, (acc, i) => acc + i, 0);
      i = Math.min(i + 1, count - sum);
    }

    return {
      getHeight: (): number => lines[lines.length - 1] * (enemy.size.height + gap),
      build: (enemy: Enemy): Enemy[] => {
        const max = Math.max(...lines);
        const enemies = [];
        for (let i = 0; i <= lines.length; i += 1) {
          const line = lines[i];
          for (let j = 0; j <= line; j += 1) {
            const delta = max - line;
            const padding = ((gap + enemy.getSize().height) * delta) / 2;
            const newEnemy = clone(enemy);
            const { x, y } = newEnemy.getPosition();
            const { height, width } = newEnemy.getSize();
            const axis = y + (height + gap) * j + padding;
            newEnemy.setPosition(x + (width + gap) * i, axis);
            newEnemy.setAxis(axis);
            enemies.push(newEnemy);
          }
        }
        return enemies;
      },
    };
  },
};
