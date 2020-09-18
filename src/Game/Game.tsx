import React from 'react';

import { GameEngine } from './GameEngine';
import initEntities from './Entities';
import { DestroySystem, TouchSystem, EnemySystem, BulletSystem, StatusSystem } from './Systems';

import { Result } from './Result';

import styles from './Game.module.scss';

const getWindowSize = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

interface IProps {}
interface IState {
  score: number;
  size: Size;
  level: GameLevel;
  entities: IEntity[];
  status: 'game-running' | 'game-over';
}

export class Game extends React.PureComponent<IProps, IState> {
  ref: React.RefObject<GameEngine> = React.createRef();

  private systems = [TouchSystem, BulletSystem, EnemySystem, DestroySystem, StatusSystem];

  constructor(props: IProps) {
    super(props);

    this.state = {
      score: 0,
      size: getWindowSize(),
      level: 'EASY',
      entities: [],
      status: 'game-running',
    };
  }

  componentDidMount() {
    this.init();
    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate(_prevProps: IProps, prevState: IState) {
    const { level, size } = this.state;

    if (size !== prevState.size) {
      this.init();
    }

    if (level !== prevState.level) {
      this.ref.current?.dispatchEvent({
        level,
        type: 'level',
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const { entities, size, score, status } = this.state;
    return (
      <div className={styles.container}>
        <GameEngine
          className={styles.game}
          ref={this.ref}
          entities={entities}
          size={size}
          systems={this.systems}
          onEvent={this.onEvent}
        />
        <div className={styles.score}>{score}</div>
        {status === 'game-over' ? <Result score={score} start={this.start} /> : null}
      </div>
    );
  }

  private init = () => {
    this.setState(({ size }) => ({
      entities: initEntities(size),
    }));
  };

  private onEvent = (event: IGameEvent) => {
    if (event.type === 'score') {
      this.updateScore();
    }

    if (event.type === 'game-over') {
      this.onGameOver();
    }
  };

  private onResize = () => {
    this.setState({
      size: getWindowSize(),
    });
  };

  private updateScore = () => {
    this.setState((prevState) => {
      const newScore = prevState.score + 1;
      let { level } = prevState;

      if (newScore > 60) {
        level = 'EXTREME';
      }

      if (newScore > 30) {
        level = 'HARD';
      }

      if (newScore > 15) {
        level = 'MEDIUM';
      }

      return {
        level,
        score: newScore,
      };
    });
  };

  private start = () => {
    this.setState(
      ({ size }) => ({
        entities: initEntities(size),
        status: 'game-running',
        score: 0,
      }),
      () => {
        this.ref.current?.start();
      }
    );
  };

  private onGameOver = () => {
    this.ref.current?.stop();

    this.setState({
      status: 'game-over',
    });
  };
}
