import { Background } from './Background';
import { Hero } from './Hero';

export const initEntities = (size: Size): Entity[] => {
  const { width, height } = size;

  return [
    new Background(-width / 2, 0, width, height),
    new Background(width / 2, 0, width, height),
    new Hero(width * 0.1, height / 2),
  ];
};

export * from './Base';
export * from './Background';
export * from './Hero';
export * from './Shot';
export * from './Enemy';
