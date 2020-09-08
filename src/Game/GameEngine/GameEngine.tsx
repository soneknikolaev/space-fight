import React, { useRef } from 'react';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';

import { Events } from 'Service/Events';

import { Canvas } from './Canvas';
import { useTick } from './hooks';

export interface IGameEngine {
  className?: string;
  size: Size;
  entities: Entity[];
  systems: System[];
}

export const GameEngine: React.FC<IGameEngine> = ({ className, size, systems, ...rest }) => {
  const ref = useRef(null);
  const canvas = Canvas(ref);
  const entities = useRef(rest.entities);
  const touches = Events<CanvasTouchEvent>();
  const events = Events<GameEvent>();

  useTick(() => {
    if (!ref.current) return;

    const ctx = canvas.getContext();
    const { width, height } = canvas.getSize();

    ctx.clearRect(0, 0, width, height);

    const time = performance.now();

    entities.current = reduce(
      systems,
      (acc: Entity[], system: System) =>
        system(acc, {
          canvas,
          time,
          touches: touches.get(),
          events: events.get(),
          dispatch: events.dispatch,
        }),
      entities.current
    );

    forEach(entities.current, (entity: Entity) => {
      ctx.save();
      entity.render(canvas);
      ctx.restore();
    });

    touches.reset();
    events.reset();
  });

  const onTouch = (e: React.MouseEvent) => {
    touches.dispatch({
      canvas,
      type: e.type,
      position: {
        x: e.clientX,
        y: e.clientY,
      },
    });
  };

  return <canvas className={className} ref={ref} {...size} onMouseMove={onTouch} onClick={onTouch} />;
};
