import { LogicException } from '../Exception';

require('dotenv').config();

export const Config = {
  get(key: string): any {
    if (key in window) {
      return (window as any)[key];
    }

    if (key in process.env) {
      try {
        return JSON.parse(process.env[key] as string);
      } catch {
        return process.env[key];
      }
    }

    throw new LogicException(`${key} doesn't set`);
  },

  getCdnUrl(): string {
    return this.get('REACT_APP_CDN_URL');
  },
};
