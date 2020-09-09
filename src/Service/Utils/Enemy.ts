import clone from 'lodash/clone';
import map from 'lodash/map';

export const createSnake = <Enemy extends IPhysicBase>(enemy: Enemy, count: number, gap: number): Enemy[] => {
  return map([...new Array(count)], (_: any, i: number) => {
    const newEnemy = clone(enemy);
    const { width } = newEnemy.getSize();
    const { x, y } = newEnemy.getPosition();

    newEnemy.setPosition(x + (width + gap) * i, y);
    return newEnemy;
  });
};
