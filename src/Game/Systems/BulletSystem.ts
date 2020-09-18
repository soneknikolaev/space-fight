import concat from 'lodash/concat';
import forEach from 'lodash/forEach';
import { Sound } from 'Service/SoundPlayer';

import { Bullet, Enemy } from '../Entities';

export const BulletSystem = (entities: IEntity[], params: SystemParams) => {
  const bullets: IEntity[] = [];
  forEach(params.events, (event: IGameEvent) => {
    if (event.type === 'shot') {
      const { provider } = event as ShotGameEvent;
      Sound.shot.play();

      bullets.push(new Bullet(0, 0, provider, 'right'));
    }
  });

  forEach(entities, (entity: IEntity) => {
    if (entity instanceof Enemy && entity.isShooter) {
      Math.random() > 0.95 && bullets.push(new Bullet(0, 0, entity, 'left'));
    }
  });
  return concat(entities, bullets);
};
