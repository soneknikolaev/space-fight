import forEach from 'lodash/forEach';

import { Hero, isHero } from '../Entities';

export const TouchSystem = (entities: IEntity[], { touches, canvas }: SystemParams) => {
  const hero = entities.find((entity) => isHero(entity)) as Hero;
  if (!hero) return entities;

  forEach(touches, (touch: CanvasTouchEvent) => {
    if (touch.type === 'move') {
      const { position } = touch;
      const heroSize = hero.getSize();
      const canvasSize = canvas.getSize();
      const width = heroSize.width / 2;
      const height = heroSize.height / 2;
      let { x, y } = position;

      const limitX = canvasSize.width - width;
      const limitY = canvasSize.height - height;

      if (x > limitX) {
        x = limitX;
      } else if (x < width) {
        x = width;
      }

      if (y > limitY) {
        y = limitY;
      } else if (y < height) {
        y = height;
      }

      const newX = Math.round(x - width);
      const newY = Math.round(y - height);

      hero.setTranslateTo(newX, newY);
    }
  });

  return entities;
};
