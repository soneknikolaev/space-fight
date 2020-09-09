import reduce from 'lodash/reduce';
import find from 'lodash/find';
import inRange from 'lodash/inRange';

export const getCollision = (entities: IPhysicEntity[]): Collision => {
  return {
    pairs: reduce(
      entities,
      (acc: CollisionPair[], bodyA: IPhysicEntity) => {
        const { x: x1, y: y1 } = bodyA.getPosition();
        const { width: width1, height: height1 } = bodyA.getSize();
        const bodyB = find(entities, (entity: IPhysicEntity) => {
          if (entity === bodyA) return false;

          const { x: x2, y: y2 } = entity.getPosition();
          const { width: width2, height: height2 } = entity.getSize();
          const endX = x2 + width2 + 1;
          const endY = y2 + height2 + 1;
          const isCollisionByX = inRange(x1, x2, endX) || inRange(x1 + width1, x2, endX);
          const isCollisionByY = inRange(y1, y2, endY) || inRange(y1 + height1, y2, endY);

          return isCollisionByX && isCollisionByY;
        });

        if (bodyB) {
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
