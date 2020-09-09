import forEach from 'lodash/forEach';

export const TouchSystem = (entities: IEntity[], params: SystemParams) => {
  const { touches } = params;

  forEach(touches, (touch: CanvasTouchEvent) => {
    if (touch.type === 'mousemove') {
      entities.forEach((entity: IEntity) => entity.onMove && entity.onMove(touch, params));
    }

    if (touch.type === 'click') {
      entities.forEach((entity: IEntity) => entity.onPress && entity.onPress(touch, params));
    }
  });

  return entities;
};
