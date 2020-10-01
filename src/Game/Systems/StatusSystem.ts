import { isHero } from '../Entities';

export const StatusSystem = (entities: IEntity[], { dispatch }: SystemParams) => {
  const hero = entities.find(isHero);

  !hero &&
    dispatch({
      type: 'game-over',
    });

  return entities;
};
