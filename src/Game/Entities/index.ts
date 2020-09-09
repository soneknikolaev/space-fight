import { Background } from './Background';
import { Hero } from './Hero';

export * from './Base';
export * from './Background';
export * from './Hero';
export * from './Bullet';
export * from './Enemy';

export default (size: Size): IEntity[] => {
  const { width, height } = size;

  const background1 = new Background(-width / 2, 0);
  const background2 = new Background(width / 2, 0);

  background1.setSize(width, height);
  background2.setSize(width, height);

  return [background1, background2, new Hero(width * 0.1, height / 2)];
};
