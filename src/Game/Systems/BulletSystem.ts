import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import find from 'lodash/find';
import inRange from 'lodash/inRange';
// import { Sound } from 'Service/SoundPlayer';

import { Bullet, Enemy, IEnemy, Hero } from '../Entities';

export const BulletSystem = (entities: IEntity[], params: SystemParams) => {
  const bullets: IEntity[] = [];
  forEach(params.events, (event: IGameEvent) => {
    if (event.type === 'shot') {
      const { provider } = event as ShotGameEvent;
      // Sound.shot.play();

      bullets.push(new Bullet(provider, 'right'));
    }
  });

  const hero = find(entities, (entity: IEntity) => entity instanceof Hero);

  if (hero) {
    const { y } = hero.getPosition();
    const enemies = filter(entities, (entity: IEntity) => entity instanceof Enemy) as IEnemy[];

    forEach(enemies, (enemy: IEnemy) => {
      const { height } = enemy.getSize();
      const shift = height * 2;
      const { x: x0, y: y0 } = enemy.getPosition();

      const isBlock = !!find(enemies, (enemy2: IEnemy) => {
        const { x: x1, y: y1 } = enemy2.getPosition();
        const end = y1 + enemy2.getSize().height;

        return enemy2.id !== enemy.id && (inRange(y0, y1, end) || inRange(y0 + height, y1, end)) && x1 <= x0;
      });

      if (enemy.canShot && inRange(y, y0 - shift, y0 + shift) && !isBlock) {
        bullets.push(new Bullet(enemy, 'left'));
      }
    });
  }
  return [...entities, ...bullets];
};
