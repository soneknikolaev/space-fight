import { Howl } from 'howler';

import { Config } from 'Service/Config';

const Sound = {
  gameOver: new Howl({
    src: [`${Config.getCdnUrl()}sounds/game-over.wav`],
    html5: true,
    preload: true,
    volume: 0.3,
  }),
  game: new Howl({
    src: [`${Config.getCdnUrl()}sounds/game.mp3`],
    html5: true,
    preload: true,
  }),
  shot: new Howl({
    src: [`${Config.getCdnUrl()}sounds/blaster.wav`],
    html5: true,
  }),
};

export { Sound };
