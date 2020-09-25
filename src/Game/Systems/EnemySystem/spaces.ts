import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';
import forEach from 'lodash/forEach';

import { Enemy, isEnemy, minEnemySize } from '../../Entities';

export const getEnemySpace = (entity: Enemy): ISpace => {
  const { width } = entity.getSize();
  const { x } = entity.getPosition();
  const padding = 5;

  return [x - padding, x + width + padding];
};

export const getSpaceWithEnemies = (entities: IEntity[]): ISpace[] => {
  return sortBy(
    reduce(
      entities,
      (acc: ISpace[], entity: IEntity) => {
        if (!isEnemy(entity)) return acc;

        const space = getEnemySpace(entity as Enemy);

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
  const spaces = getSpaceWithoutEnemies(entities, canvas);
  let space: ISpace | undefined;

  forEach(spaces, (newSpace: ISpace) => {
    if (!space || space[1] - space[0] < newSpace[1] - newSpace[0]) {
      space = newSpace;
    }
  });

  return space;
};

export const getBusySpaceInProcent = (entities: IEntity[], canvas: Canvas): number => {
  const spaceWithEnemies = getSpaceWithEnemies(entities);
  const { width } = canvas.getSize();
  return reduce(spaceWithEnemies, (acc: number, [p0, p1]: ISpace) => p1 - p0 + acc, 0) / width;
};
