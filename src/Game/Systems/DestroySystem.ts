import filter from 'lodash/filter';
import forEach from 'lodash/forEach';

import { Bullet, isBullet, isEnemy, isHero } from '../Entities';

import { getCollision } from '../GameEngine';

export const DestroySystem = (entities: IEntity[], params: SystemParams) => {
  let destroyed: IEntity[] = [];
  forEach(getCollision(entities).pairs, (pair: CollisionPair) => {
    destroyed = destroyed.concat(pair);
    const bullet = pair.find(isBullet) as Bullet | undefined;
    const enemy = pair.find(isEnemy);

    if (bullet && enemy && isHero(bullet.shooter)) {
      params.dispatch({
        type: 'score',
      });
    }
  });

  return filter(entities, (entity1: IEntity) => !destroyed.find((entity2: IEntity) => entity1.id === entity2.id));
};
