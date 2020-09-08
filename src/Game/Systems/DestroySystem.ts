import concat from 'lodash/concat';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';

import { Physic } from '../Entities';

import { getCollision } from '../GameEngine';

export const DestroySystem = (entities: Entity[]) => {
  const physicEntities = [];
  const staticEntities = [];

  for (const entity of entities) {
    entity instanceof Physic ? physicEntities.push(entity) : staticEntities.push(entity);
  }

  forEach(getCollision(physicEntities).pairs, ({ bodyA, bodyB }: CollisionPair) => {
    bodyA.destroy();
    bodyB.destroy();
  });

  return concat(
    staticEntities,
    filter(physicEntities, (entity: PhysicEntity) => !entity.isDestroyed)
  );
};
