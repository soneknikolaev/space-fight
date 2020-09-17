import filter from 'lodash/filter';
import reduce from 'lodash/reduce';
import random from 'lodash/random';
import { shapes, Enemy, enemies } from '../../Entities';

const getRandomElement = <Element extends any>(array: Element[]): Element => {
  return array[random(0, array.length - 1)];
};

export const generate = (canvas: Canvas, spaces: ISpace[], config: LevelConfig): Enemy[] => {
  if (Math.random() >= 0.2) return [];

  const [p0, p1] = getRandomElement(spaces);
  const height = p1 - p0;
  let enemyParams = getRandomElement(filter(enemies, (enemy: EnemyParams) => height >= enemy.size.height));

  if (!enemyParams) return [];

  enemyParams = {
    ...enemyParams,
    speed: enemyParams.speed * config.speed,
  };

  if (enemyParams.single) {
    return [new Enemy(canvas.getSize().width, random(p0, p1 - enemyParams.size.height), enemyParams)];
  }

  const count = random(1, 6);
  const shape = getRandomElement(
    reduce(
      shapes,
      (acc: ShapeMethods[], shape) => {
        const shapeObj = shape(enemyParams, count);
        if (shapeObj.getHeight() <= height) {
          acc.push(shapeObj);
        }

        return acc;
      },
      []
    )
  );

  if (!shape) return [];

  console.log(p0, p1, canvas.getSize().height);
  return shape.build(new Enemy(canvas.getSize().width, random(p0, p1 - shape.getHeight()), enemyParams));
};
