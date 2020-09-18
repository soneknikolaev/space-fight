import minBy from 'lodash/minBy';

import { getImage } from 'Service/Images';

export const enemies: EnemyParams[] = [
  {
    img: getImage('enemy1.svg'),
    size: {
      width: 20,
      height: 30,
    },
    speed: 10,
    single: false,
  },
  {
    img: getImage('enemy2.svg'),
    size: {
      width: 30,
      height: 20,
    },
    speed: 15,
    single: false,
  },
  {
    img: getImage('enemy3.svg'),
    size: {
      width: 30,
      height: 20,
    },
    speed: 15,
    single: true,
  },
  {
    img: getImage('enemy4.svg'),
    size: {
      width: 20,
      height: 30,
    },
    speed: 10,
    single: true,
  },
];

export const minEnemySize = minBy(enemies, (param: EnemyParams) => param.size.height)?.size.height || 0;
