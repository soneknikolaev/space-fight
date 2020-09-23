import minBy from 'lodash/minBy';

import { getImage } from 'Service/Images';

export const enemiesParams: EnemyParams[] = [
  {
    img: getImage('enemy1.svg'),
    size: {
      width: 45,
      height: 25,
    },
    translateOn: 8,
  },
  {
    img: getImage('enemy2.svg'),
    size: {
      width: 30,
      height: 40,
    },
    translateOn: 10,
  },
  {
    img: getImage('enemy3.svg'),
    size: {
      width: 30,
      height: 40,
    },
    translateOn: 10,
  },
  {
    img: getImage('enemy4.svg'),
    size: {
      width: 40,
      height: 20,
    },
    translateOn: 8,
  },
];

export const minEnemySize = minBy(enemiesParams, (param: EnemyParams) => param.size.height)?.size.height || 0;
