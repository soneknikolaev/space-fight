import React, { useEffect, useState } from 'react';

const getWindowSize = (): Size => ({
  width: window.innerWidth, // Math.min(window.innerWidth, window.innerHeight),
  height: window.innerHeight,
});

interface IResizeProps {
  size: Size;
}

export const withResize = <P extends IResizeProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof IResizeProps>> => (props: any) => {
  const [size, setSize] = useState(getWindowSize());

  useEffect(() => {
    const onResize = () => setSize(getWindowSize());

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [setSize]);

  return <Component {...props} size={size} />;
};
