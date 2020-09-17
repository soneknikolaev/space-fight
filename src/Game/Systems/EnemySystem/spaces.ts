import concat from 'lodash/concat';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';

import { Enemy, minEnemySize } from '../../Entities';

export const space = {
  getBusyProcent(entities: IEntity[], canvas: Canvas): number {
    const spaceWithEnemies = this.getWithEnemies(entities);
    const { height } = canvas.getSize();
    return reduce(spaceWithEnemies, (acc: number, [p0, p1]: ISpace) => p1 - p0 + acc, 0) / height;
  },

  getWithEnemies(entities: IEntity[]): ISpace[] {
    return sortBy(
      reduce(
        entities,
        (acc: ISpace[], entity: IEntity) => {
          if (
            entity instanceof Enemy &&
            !find(acc, ([p0, p1]: ISpace) => p0 === entity.space[0] && p1 === entity.space[1])
          ) {
            acc.push(entity.space);
          }

          return acc;
        },
        []
      ),
      (a: ISpace) => a[1]
    );
  },

  getWithoutEnemies(entities: IEntity[], canvas: Canvas): ISpace[] {
    const spaceWithEnemies = this.getWithEnemies(entities);
    const { height } = canvas.getSize();

    if (spaceWithEnemies.length === 0) return [[0, height]];

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

        if (!next && height - p1 > 0) {
          spaces.push([p1, height]);
        }

        return concat(acc, spaces);
      },
      []
    );
  },
};
