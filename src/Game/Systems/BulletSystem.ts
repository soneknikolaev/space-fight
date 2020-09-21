import forEach from 'lodash/forEach';
import find from 'lodash/find';
import inRange from 'lodash/inRange';
import { Sound } from 'Service/SoundPlayer';

import { Bullet, Enemy, Hero } from '../Entities';

export const BulletSystem = (entities: IEntity[], params: SystemParams) => {
  const bullets: IEntity[] = [];
  forEach(params.events, (event: IGameEvent) => {
    if (event.type === 'shot') {
      const { provider } = event as ShotGameEvent;
      Sound.shot.play();

      bullets.push(new Bullet(provider, 'right'));
    }
  });

  const hero = find(entities, (entity: IEntity) => entity instanceof Hero);

  if (hero) {
    const { y } = hero.getPosition();

    forEach(entities, (entity: IEntity) => {
      if (!(entity instanceof Enemy)) return;

      const shift = entity.getSize().height * 2;
      const pos = entity.getPosition().y;

      if (entity.canShot && inRange(y, pos - shift, pos + shift)) {
        bullets.push(new Bullet(entity, 'left'));
      }
    });
  }
  return [...entities, ...bullets];
};
