import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import find from 'lodash/find';
import inRange from 'lodash/inRange';

import { Bullet, Enemy, IEnemy, Hero } from '../Entities';

export const BulletSystem = (entities: IEntity[]) => {
  const bullets: IEntity[] = [];

  const hero = find(entities, (entity: IEntity) => entity instanceof Hero) as Hero;

  if (hero) {
    const { x } = hero.getPosition();
    const enemies = filter(entities, (entity: IEntity) => entity instanceof Enemy) as IEnemy[];

    if (hero.canShot) bullets.push(new Bullet(hero, 'up'));

    forEach(enemies, (enemy: IEnemy) => {
      const { width } = enemy.getSize();
      const shift = width * 2;
      const { x: x0, y: y0 } = enemy.getPosition();

      const isBlock = !!find(enemies, (enemy2: IEnemy) => {
        const { x: x1, y: y1 } = enemy2.getPosition();
        const end = x1 + enemy2.getSize().width;

        return enemy2.id !== enemy.id && (inRange(x0, x1, end) || inRange(x0 + width, x1, end)) && y1 >= y0;
      });

      if (enemy.canShot && inRange(x, x0 - shift, x0 + shift) && !isBlock) {
        bullets.push(new Bullet(enemy, 'down'));
      }
    });
  }

  return [...entities, ...bullets];
};
