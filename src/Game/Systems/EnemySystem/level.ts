import { LogicException } from 'Service/Exception';

const LEVELS: {
  [level: string]: LevelConfig;
} = {
  EASY: {
    speed: 0.75,
    procent: 0.4,
  },
  MEDIUM: {
    speed: 1,
    procent: 0.6,
  },
  HARD: {
    speed: 1.25,
    procent: 0.8,
  },
  EXTREME: {
    speed: 1.5,
    procent: 1,
  },
};

export const LevelConfig = (level: GameLevel): LevelConfig => {
  const config = LEVELS[level];

  if (!config) {
    throw new LogicException(`Config for ${level} is not defined`);
  }

  return config;
};
