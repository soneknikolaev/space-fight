import { Config } from 'Service/Config';

export const getImage = (path: string): HTMLImageElement => {
  const image = new Image();

  image.src = `${Config.getCdnUrl()}images/${path}`;

  return image;
};
