import minBy from 'lodash/minBy';

import { getImage } from 'Service/Images';

export const enemies: EnemyParams[] = [
  {
    img: getImage('enemy1.svg'),
    size: {
      width: 40,
      height: 20,
    },
    translateOn: 5,
  },
  {
    img: getImage('enemy2.svg'),
    size: {
      width: 20,
      height: 30,
    },
    translateOn: 8,
  },
  {
    img: getImage('enemy3.svg'),
    size: {
      width: 25,
      height: 30,
    },
    translateOn: 8,
  },
  {
    img: getImage('enemy4.svg'),
    size: {
      width: 30,
      height: 20,
    },
    translateOn: 5,
  },
];

export const minEnemySize = minBy(enemies, (param: EnemyParams) => param.size.height)?.size.height || 0;
