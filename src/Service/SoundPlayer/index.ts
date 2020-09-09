import { Howl } from 'howler';

import { Config } from 'Service/Config';

const Sound = {
  shot: new Howl({
    src: [`${Config.getCdnUrl()}sounds/blaster.wav`],
    html5: true,
  }),
};

export { Sound };
