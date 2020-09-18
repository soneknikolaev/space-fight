import forEach from 'lodash/forEach';
import { Sound } from 'Service/SoundPlayer';

import { Bullet } from '../Entities';

export const BulletSystem = (entities: IEntity[], params: SystemParams) => {
  forEach(params.events, (event: IGameEvent) => {
    if (event.type === 'shot') {
      const { provider } = event as ShotGameEvent;
      const { width, height } = provider.getSize();
      const { x, y } = provider.getPosition();

      Sound.shot.play();

      const bullet = new Bullet(0, 0, provider);
      const bulletSize = bullet.getSize();
      bullet.setPosition(x + width + bulletSize.width, y + height / 2 - bulletSize.height);
      entities.push(bullet);
    }
  });

  return entities;
};
