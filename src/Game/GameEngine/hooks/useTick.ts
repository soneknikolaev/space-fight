import { useEffect } from 'react';

const fps = 33;

export function useTick(cb: () => void) {
  let lastTick = performance.now();

  useEffect(() => {
    const timer = (): number => {
      const nowTime = performance.now();

      if (nowTime - lastTick >= fps) {
        lastTick = performance.now();
        cb();
      }

      return requestAnimationFrame(timer);
    };

    const animationFrame = timer();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
}
