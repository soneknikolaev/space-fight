import { Background } from './Background';
import { Hero } from './Hero';

export * from './Base';
export * from './Background';
export * from './Hero';
export * from './Shot';
export * from './Enemy';

export default (size: Size) => {
  const { width, height } = size;

  return [
    new Background(-width / 2, 0, width, height),
    new Background(width / 2, 0, width, height),
    new Hero(width * 0.1, height / 2),
  ];
};
