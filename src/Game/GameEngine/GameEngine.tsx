import React, { useRef } from 'react';

import { Canvas } from './Canvas';
import { Touches } from './Touches';
import { useTick } from './hooks';

export interface IGameEngine {
  className?: string;
  size: Size;
  entities: Entity[];
  systems: System[];
}

export const GameEngine: React.FC<IGameEngine> = ({ className, size, systems, ...rest }) => {
  const ref = useRef(null);
  const entities = useRef(rest.entities);
  const touches = Touches();

  useTick(() => {
    if (!ref.current) return;

    const canvas = Canvas(ref);
    const ctx = canvas.getContext();
    const { width, height } = canvas.getSize();

    ctx.clearRect(0, 0, width, height);

    entities.current = systems.reduce((acc: Entity[], system: System) => system(acc, touches.get()), entities.current);

    entities.current.forEach((entity: Entity) => {
      ctx.save();
      entity.render(canvas);
      ctx.restore();
    });

    touches.reset();
  });

  const onMouseMove = (e: React.MouseEvent) => {
    touches.add({
      type: 'move' as TouchTypeEngine,
      position: {
        x: e.clientX,
        y: e.clientY,
      },
    });
  };

  return <canvas className={className} ref={ref} {...size} onMouseMove={onMouseMove} />;
};
