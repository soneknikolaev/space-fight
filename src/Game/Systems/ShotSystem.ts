import forEach from 'lodash/forEach';

import { Sound } from 'Service/SoundPlayer';

import { Shot } from '../Entities';

export const ShotSystem = (entities: IEntity[], params: SystemParams) => {
  forEach(params.events, (event: GameEvent) => {
    if (event.type === 'shot') {
      const { provider } = event;
      const { width, height } = provider.getSize();
      const { x, y } = provider.getPosition();

      Sound.shot.play();
      entities.push(new Shot(x + width + 5, y + height / 2 - 2, provider));
    }
  });

  return entities;
};
