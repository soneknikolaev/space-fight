import reduce from 'lodash/reduce';
import find from 'lodash/find';
import inRange from 'lodash/inRange';

export const getCollision = (entities: PhysicEntity[]): Collision => {
  return {
    pairs: reduce(
      entities,
      (acc: CollisionPair[], bodyA: PhysicEntity) => {
        const { x: x1, y: y1 } = bodyA.getPosition();
        const { width: width1, height: height1 } = bodyA.getSize();
        const bodyB = find(entities, (entity: PhysicEntity) => {
          if (entity === bodyA) return false;

          const { x: x2, y: y2 } = entity.getPosition();
          const { width: width2, height: height2 } = entity.getSize();
          const isCollisionByX = inRange(x1, x2, x2 + width2) || inRange(x1 + width1, x2, x2 + width2);
          const isCollisionByY = inRange(y1, y2, y2 + height2) || inRange(y1 + height1, y2, y2 + height2);

          return isCollisionByX && isCollisionByY;
        });

        if (
          bodyB &&
          !find(
            acc,
            (pair: CollisionPair) =>
              (pair.bodyA.id === bodyA.id || pair.bodyA.id === bodyB.id) &&
              (pair.bodyB.id === bodyA.id || pair.bodyB.id === bodyB.id)
          )
        ) {
          acc.push({
            bodyA,
            bodyB,
          });
        }

        return acc;
      },
      []
    ),
  };
};
