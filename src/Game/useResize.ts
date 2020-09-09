import { useEffect, useCallback } from 'react';

export const getWindowSize = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const useResize = (cb: () => void) => {
  const onResize = useCallback(cb, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
};
