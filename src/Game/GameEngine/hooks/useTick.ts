import { useEffect, useRef } from 'react';

const fps = 33;

export function useTick(cb: () => void) {
  const lastTick = useRef(performance.now());

  const timer = (): number => {
    const nowTime = performance.now();

    if (nowTime - lastTick.current >= fps) {
      lastTick.current = performance.now();
      cb();
    }

    return requestAnimationFrame(timer);
  };

  useEffect(() => {
    const animationFrame = timer();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
}
