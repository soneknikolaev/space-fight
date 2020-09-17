import concat from 'lodash/concat';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';

import { PhysicBase, Enemy, Bullet } from '../Entities';

import { getCollision } from '../GameEngine';

export const DestroySystem = (entities: IEntity[], params: SystemParams) => {
  const physicEntities = [];
  const staticEntities = [];

  for (const entity of entities) {
    entity instanceof PhysicBase ? physicEntities.push(entity) : staticEntities.push(entity);
  }

  forEach(getCollision(physicEntities).pairs, ({ bodyA, bodyB }: CollisionPair) => {
    bodyA.destroy();
    bodyB.destroy();

    let provider;

    if (bodyA instanceof Enemy && bodyB instanceof Bullet) provider = bodyB;
    if (bodyB instanceof Enemy && bodyA instanceof Bullet) provider = bodyA;

    if (provider) {
      params.dispatch({
        provider,
        type: 'score',
      });
    }
  });

  return concat(
    staticEntities,
    filter(physicEntities, (entity: IPhysicEntity) => !entity.isDestroyed)
  );
};
