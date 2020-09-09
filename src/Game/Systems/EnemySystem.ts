import concat from 'lodash/concat';
import { createSnake } from 'Service/Utils';

import { Enemy } from '../Entities';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let steps = 0;

export const EnemySystem = (entities: IEntity[], params: SystemParams) => {
  // create enemy system
  steps += 1;
  let newEnemies: IPhysicEntity[] = [];

  const enemyCount = entities.filter((entity) => entity instanceof Enemy).length;
  const enemyLimit = 1;

  if (enemyLimit > enemyCount) {
    const canvasSize = params.canvas.getSize();

    const enemy = new Enemy(canvasSize.width, canvasSize.height / 2);
    newEnemies = createSnake(enemy, 5, 5);
  }
  return concat(entities, newEnemies);
};
