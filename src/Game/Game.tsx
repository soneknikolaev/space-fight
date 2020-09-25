import React from 'react';

import { Sound } from 'Service/SoundPlayer';

import { withResize } from './withResize';
import { GameEngine } from './GameEngine';
import initEntities from './Entities';
import { DestroySystem, TouchSystem, EnemySystem, BulletSystem, StatusSystem, EdgeSystem } from './Systems';
import { Result } from './Result';

import styles from './Game.module.scss';

interface IProps {
  size: Size;
}
interface IState {
  score: number;
  level: GameLevel;
  entities: IEntity[];
  status: 'game-running' | 'game-over' | 'loading';
}

class GameBase extends React.PureComponent<IProps, IState> {
  ref: React.RefObject<GameEngine> = React.createRef();

  private systems = [TouchSystem, BulletSystem, EnemySystem, DestroySystem, StatusSystem, EdgeSystem];

  constructor(props: IProps) {
    super(props);

    this.state = {
      score: 0,
      level: 'EASY',
      entities: [],
      status: 'loading',
    };
  }

  componentDidMount() {
    this.start();
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { level } = this.state;
    const { size } = this.props;

    if (size !== prevProps.size) {
      this.start();
    }

    if (level !== prevState.level) {
      this.ref.current?.dispatchEvent({
        level,
        type: 'level',
      });
    }
  }

  render() {
    const { size } = this.props;
    const { entities, score, status } = this.state;
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

  private onEvent = (event: IGameEvent) => {
    if (event.type === 'score') {
      this.updateScore();
    }

    if (event.type === 'game-over') {
      this.onGameOver();
    }
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
    Sound.gameOver.stop();
    Sound.game.play();
    this.setState(
      {
        entities: initEntities(this.props.size),
        status: 'game-running',
        score: 0,
      },
      this.ref.current?.start
    );
  };

  private onGameOver = () => {
    this.ref.current?.stop();
    Sound.game.stop();
    Sound.gameOver.play();
    this.setState({
      status: 'game-over',
    });
  };
}

export const Game = withResize<IProps>(GameBase);
