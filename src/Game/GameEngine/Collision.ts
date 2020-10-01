import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import inRange from 'lodash/inRange';

export const getCollision = (entities: IEntity[]): Collision => {
  const notStaticEntities = filter(entities, (entity) => !entity.isStatic);

  return {
    pairs: reduce(
      notStaticEntities,
      (acc: CollisionPair[], bodyA: IEntity) => {
        const { x: x1, y: y1 } = bodyA.getPosition();
        const { width: width1, height: height1 } = bodyA.getSize();
        const bodyB = notStaticEntities.find((entity: IEntity) => {
          if (entity.id === bodyA.id) return false;

          const { x: x2, y: y2 } = entity.getPosition();
          const { width: width2, height: height2 } = entity.getSize();
          const endX = x2 + width2 + 1;
          const endY = y2 + height2 + 1;
          const isCollisionByX = inRange(x1, x2, endX) || inRange(x1 + width1, x2, endX);
          const isCollisionByY = inRange(y1, y2, endY) || inRange(y1 + height1, y2, endY);

          return isCollisionByX && isCollisionByY;
        });

        bodyB && acc.push([bodyA, bodyB]);

        return acc;
      },
      []
    ),
  };
};
