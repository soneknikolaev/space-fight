import { Howl } from 'howler';

import { Config } from 'Service/Config';

const Sound = {
  gameOver: new Howl({
    src: [`${Config.getCdnUrl()}sounds/game-over.wav`],
    volume: 0.3,
  }),
  game: new Howl({
    src: [`${Config.getCdnUrl()}sounds/game.mp3`],
  }),
};

export { Sound };
