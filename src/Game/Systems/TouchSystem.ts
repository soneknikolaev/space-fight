export const TouchSystem = (entities: Entity[], touches: TouchEngine[]) => {
  touches
    .filter((touch: TouchEngine) => touch.type === 'move')
    .forEach((touch: TouchEngine) => {
      entities.forEach((entity: Entity) => entity.onMove && entity.onMove(touch));
    });

  return entities;
};
