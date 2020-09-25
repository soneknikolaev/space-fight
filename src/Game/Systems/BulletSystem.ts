import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import inRange from 'lodash/inRange';

import { Bullet, Hero, isHero, Enemy, isEnemy } from '../Entities';

export const BulletSystem = (entities: IEntity[]) => {
  const bullets: IEntity[] = [];

  const hero = entities.find(isHero) as Hero;

  if (hero) {
    const { x } = hero.getPosition();
    const enemies = filter(entities, isEnemy) as Enemy[];
    const shift = hero.getSize().width * 2;

    if (hero.canShot) bullets.push(new Bullet(hero, '#D09BFF', -20));

    forEach(enemies, (enemy: Enemy) => {
      const { width } = enemy.getSize();
      const { x: x0, y: y0 } = enemy.getPosition();

      const isBlock = !!enemies.find((enemy2: Enemy) => {
        const { x: x1, y: y1 } = enemy2.getPosition();
        const end = x1 + enemy2.getSize().width;

        return enemy2.id !== enemy.id && y1 >= y0 && (inRange(x0, x1, end) || inRange(x0 + width, x1, end));
      });

      if (enemy.canShot && inRange(x, x0 - shift, x0 + shift) && !isBlock) {
        bullets.push(new Bullet(enemy, '#FF6347', 20));
      }
    });
  }

  return [...entities, ...bullets];
};
