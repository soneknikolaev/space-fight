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

    if (hero.canShot) bullets.push(new Bullet(hero));

    forEach(enemies, (enemy: Enemy) => {
      const { width } = enemy.getSize();
      const shift = width * 2;
      const { x: x0, y: y0 } = enemy.getPosition();

      const isBlock = !!enemies.find((enemy2: Enemy) => {
        const { x: x1, y: y1 } = enemy2.getPosition();
        const end = x1 + enemy2.getSize().width;

        return enemy2.id !== enemy.id && (inRange(x0, x1, end) || inRange(x0 + width, x1, end)) && y1 >= y0;
      });

      if (enemy.canShot && inRange(x, x0 - shift, x0 + shift) && !isBlock) {
        bullets.push(new Bullet(enemy));
      }
    });
  }

  return [...entities, ...bullets];
};
