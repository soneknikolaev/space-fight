import React, { useRef, memo, useImperativeHandle, forwardRef } from 'react';

import { Canvas } from './Canvas';
import { useTick } from './hooks';

export interface IGameEngine {
  className?: string;
  size: Size;
  entities: IEntity[];
  systems: System[];
  onEvent?: (event: GameEvent) => void;
}

export type GameEngineRef = React.Ref<{ dispatchEvent: DispatchEvent }>;

export const GameEngine = memo(
  forwardRef((props: IGameEngine, ref: GameEngineRef) => {
    const { className, size, systems, onEvent } = props;
    const canvasRef = useRef(null);
    const entities = useRef(props.entities);
    const touches = useRef<CanvasTouchEvent[]>([]);
    const events = useRef<GameEvent[]>([]);

    const dispatchEvent = (event: GameEvent) => {
      onEvent && onEvent(event);
      events.current.push(event);
    };

    useImperativeHandle(ref, () => ({
      dispatchEvent,
    }));

    useTick(() => {
      if (!canvasRef.current) return;

      const canvas = Canvas(canvasRef);
      const ctx = canvas.getContext();
      const { width, height } = canvas.getSize();
      const time = performance.now();
      ctx.clearRect(0, 0, width, height);

      for (const system of systems) {
        entities.current = system(entities.current, {
          canvas,
          time,
          touches: touches.current,
          events: events.current,
          dispatch: dispatchEvent,
        });
      }

      for (const entity of entities.current) {
        ctx.save();
        entity.render(canvas);
        entity.translate(canvas);
        ctx.restore();
      }

      touches.current = [];
      events.current = [];
    });

    const onTouch = (e: React.MouseEvent) => {
      touches.current.push({
        canvas: Canvas(canvasRef),
        type: e.type,
        position: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    };

    return <canvas className={className} ref={canvasRef} {...size} onMouseMove={onTouch} onClick={onTouch} />;
  })
);
