import { Enemy } from '../Entities';

let steps = 0;

export const EnemySystem = (entities: Entity[], params: SystemParams) => {
  steps += 1;

  const enemyCount = entities.filter((entity) => entity instanceof Enemy).length;
  const enemyLimit = 1;

  if (enemyLimit > enemyCount) {
    const canvasSize = params.canvas.getSize();
    entities.push(new Enemy(canvasSize.width, canvasSize.height / 2));
  }
  return entities;
};
