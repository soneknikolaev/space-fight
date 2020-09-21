import filter from 'lodash/filter';
import reduce from 'lodash/reduce';
import random from 'lodash/random';
import { shapes, Enemy, enemies } from '../../Entities';

const getRandomElement = <Element extends any>(array: Element[]): Element => {
  return array[random(0, array.length - 1)];
};

const getParams = ([p0, p1]: ISpace, config: LevelConfig) => {
  const height = p1 - p0;
  const params = getRandomElement(filter(enemies, (enemy: EnemyParams) => height >= enemy.size.height));

  if (params) {
    return {
      ...params,
      speed: params.translateOn * config.speed,
    };
  }
};

export const generate = (canvas: Canvas, [p0, p1]: ISpace, config: LevelConfig): Enemy[] => {
  if (Math.random() >= 0.2) return [];

  const height = p1 - p0;
  const params = getParams([p0, p1], config);

  if (!params) return [];

  const x = canvas.getSize().width;
  const y = random(p0, p1 - params.size.height);

  if (params.single) {
    return [new Enemy(x, y, params)];
  }

  const count = random(1, 6);
  const shape = getRandomElement(
    reduce(
      shapes,
      (acc: ShapeMethods[], shape) => {
        const shapeObj = shape(params, count);
        if (shapeObj.getHeight() <= height) {
          acc.push(shapeObj);
        }

        return acc;
      },
      []
    )
  );

  if (!shape) {
    return [new Enemy(x, y, params)];
  }

  return shape.build(new Enemy(x, random(p0, p1 - shape.getHeight()), params));
};
