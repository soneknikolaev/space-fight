import { Background } from './Background';
import { Hero } from './Hero';

export const initEntities = (size: Size): Entity[] => {
  const { width, height } = size;

  return [new Background(-width / 2, 0), new Background(width / 2, 0), new Hero(width * 0.1, height / 2)];
};
