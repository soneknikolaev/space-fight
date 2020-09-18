import find from 'lodash/find';
import { Hero } from '../Entities';

export const StatusSystem = (entities: IEntity[], { dispatch }: SystemParams) => {
  const hero = find(entities, (entity) => entity instanceof Hero);

  if (!hero) {
    dispatch({
      type: 'game-over',
    });
  }
  return entities;
};
