import filter from 'lodash/filter';
import inRange from 'lodash/inRange';

export const EdgeSystem = (entities: IEntity[], { canvas }: SystemParams) => {
  const { height } = canvas.getSize();
  return filter(entities, (entity: IEntity) => {
    const { height: entityHeight } = entity.getSize();
    const { y } = entity.getPosition();

    return inRange(y, -entityHeight, height + entityHeight);
  });
};
