import { useEffect } from 'react';

export const getWindowSize = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const useResize = (cb: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
  }, []);
};
