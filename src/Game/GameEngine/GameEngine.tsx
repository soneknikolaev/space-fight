import React from 'react';

import { Canvas } from './Canvas';
import { Timer } from './Timer';

export interface IGameEngine {
  className?: string;
  size: Size;
  entities: IEntity[];
  systems: System[];
  onEvent?: (event: IGameEvent) => void;
}

interface IState {
  entities: IEntity[];
}

export class GameEngine extends React.PureComponent<IGameEngine, IState> {
  private touches: CanvasTouchEvent[] = [];

  private events: IGameEvent[] = [];

  private entities: IEntity[];

  private ref: React.RefObject<HTMLCanvasElement> = React.createRef();

  private timer: Timer = new Timer();

  constructor(props: IGameEngine) {
    super(props);
    this.entities = props.entities;

    this.timer.subscribe(this.onTick);
  }

  componentDidMount() {
    this.start();
  }

  componentDidUpdate(prevProps: IGameEngine) {
    const { entities } = this.props;
    if (prevProps.entities !== entities) {
      this.entities = entities;
    }
  }

  componentWillUnmount() {
    this.stop();
    this.timer.unsubscribe(this.onTick);
  }

  render() {
    const { className, size } = this.props;
    return (
      <canvas className={className} ref={this.ref} {...size} onMouseMove={this.onMouse} onTouchMove={this.onTouch} />
    );
  }

  private onMouse = (e: React.MouseEvent) => {
    this.touches.push({
      type: 'move',
      position: {
        x: e.clientX,
        y: e.clientY,
      },
    });
  };

  private onTouch = (e: React.TouchEvent) => {
    this.touches.push({
      type: 'move',
      position: {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      },
    });
  };

  private onTick = () => {
    this.systems();
    this.draw();
    this.touches = [];
    this.events = [];
  };

  private systems = () => {
    const canvas = Canvas(this.ref);
    const time = performance.now();

    for (const system of this.props.systems) {
      this.entities = system(this.entities, {
        canvas,
        time,
        touches: this.touches,
        events: this.events,
        dispatch: this.dispatchEvent,
      });
    }
  };

  private draw = () => {
    const canvas = Canvas(this.ref);
    const ctx = canvas.getContext();
    const { width, height } = canvas.getSize();
    ctx.clearRect(0, 0, width, height);

    for (const entity of this.entities) {
      ctx.save();
      entity.render(canvas);
      ctx.restore();
    }
  };

  dispatchEvent = (event: IGameEvent) => {
    const { onEvent } = this.props;
    onEvent && onEvent(event);
    this.events.push(event);
  };

  start = () => {
    this.timer.start();
    this.dispatchEvent({ type: 'started' });
  };

  stop = () => {
    this.timer.stop();
    this.dispatchEvent({ type: 'stopped' });
  };
}
