import reduce from 'lodash/reduce';
import random from 'lodash/random';
import sample from 'lodash/sample';

import { column } from './column';
import { front } from './front';
import { triangle } from './triangle';
import { wedge } from './wedge';
import { inclined } from './inclined';

import { IEnemy } from '../Enemy';

const shapes = [column, front, triangle, wedge, inclined];

export const createRandomShape = (edge: number, [p0, p1]: ISpace, params: EnemyParams): IEnemy[] => {
  const width = p1 - p0;

  const shape = sample(
    reduce(
      shapes,
      (acc: ShapeMethods[], shape) => {
        const shapeObj = shape(params, width);
        if (shapeObj.getMaxCount() > 0) {
          acc.push(shapeObj);
        }

        return acc;
      },
      []
    )
  );

  if (!shape) {
    return [];
  }

  return shape.build(random(p0, p1 - shape.getWidth()), edge);
};
