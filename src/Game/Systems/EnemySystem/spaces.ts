import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';

import { isEnemy, minEnemySize } from '../../Entities';

const ENEMY_PADDING = 5;

export const getEnemySpace = (entity: IEntity): ISpace => {
  const { width } = entity.getSize();
  const { x } = entity.getPosition();

  return [x - ENEMY_PADDING, x + width + ENEMY_PADDING];
};

export const getSpaceWithEnemies = (entities: IEntity[]): ISpace[] => {
  return sortBy(
    reduce(
      entities,
      (acc: ISpace[], entity: IEntity) => {
        if (!isEnemy(entity)) return acc;

        const space = getEnemySpace(entity);

        if (!acc.find(([p0, p1]: ISpace) => p0 === space[0] && p1 === space[1])) {
          acc.push(space);
        }

        return acc;
      },
      []
    ),
    (a: ISpace) => a[1]
  );
};

export const getSpaceWithoutEnemies = (entities: IEntity[], canvas: Canvas): ISpace[] => {
  const spaceWithEnemies = getSpaceWithEnemies(entities);
  const { width } = canvas.getSize();

  if (spaceWithEnemies.length === 0) return [[0, width]];

  return reduce(
    spaceWithEnemies,
    (acc: ISpace[], [p0, p1]: ISpace, i: number) => {
      const spaces: ISpace[] = [];
      const prev = spaceWithEnemies[i - 1];
      const next = spaceWithEnemies[i + 1];

      if (!prev && p0 - minEnemySize > 0) {
        spaces.push([0, p0]);
      }

      if (next && next[0] - p1 > 0) {
        spaces.push([p1, next[0]]);
      }

      if (!next && width - p1 > 0) {
        spaces.push([p1, width]);
      }

      return [...acc, ...spaces];
    },
    []
  );
};

export const getBiggestFreeSpace = (entities: IEntity[], canvas: Canvas): ISpace | undefined => {
  return maxBy(getSpaceWithoutEnemies(entities, canvas), (space) => space[1] - space[0]);
};

export const getBusySpaceInProcent = (entities: IEntity[], canvas: Canvas): number => {
  const spaceWithEnemies = getSpaceWithEnemies(entities);
  const { width } = canvas.getSize();
  return reduce(spaceWithEnemies, (acc: number, [p0, p1]: ISpace) => p1 - p0 + acc, 0) / width;
};
