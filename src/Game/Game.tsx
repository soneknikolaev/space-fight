import React from 'react';

import { withResize } from './withResize';
import { GameEngine } from './GameEngine';
import initEntities from './Entities';
import { DestroySystem, TouchSystem, EnemySystem, BulletSystem, StatusSystem } from './Systems';

import { Result } from './Result';

import styles from './Game.module.scss';

interface IProps {
  size: Size;
}
interface IState {
  score: number;
  level: GameLevel;
  entities: IEntity[];
  status: 'game-running' | 'game-over';
}

class GameBase extends React.PureComponent<IProps, IState> {
  ref: React.RefObject<GameEngine> = React.createRef();

  private systems = [TouchSystem, BulletSystem, EnemySystem, DestroySystem, StatusSystem];

  constructor(props: IProps) {
    super(props);

    this.state = {
      score: 0,
      level: 'EASY',
      entities: [],
      status: 'game-running',
    };
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { level } = this.state;
    const { size } = this.props;

    if (size !== prevProps.size) {
      this.init();
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
        <div className={styles.gameWrapper}>
          <GameEngine
            className={styles.game}
            ref={this.ref}
            entities={entities}
            size={size}
            systems={this.systems}
            onEvent={this.onEvent}
          />
        </div>
        <div className={styles.score}>{score}</div>
        {status === 'game-over' ? <Result score={score} start={this.start} /> : null}
      </div>
    );
  }

  private init = () => {
    this.setState({
      entities: initEntities(this.props.size),
    });
  };

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

    this.setState({
      status: 'game-over',
    });
  };
}

export const Game = withResize<IProps>(GameBase);
