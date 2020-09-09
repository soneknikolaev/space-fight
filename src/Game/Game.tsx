import React, { useState, useCallback, useRef } from 'react';

import { GameEngine } from './GameEngine';
import initEntities from './Entities';
import { DestroySystem, TouchSystem, EnemySystem, ShotSystem } from './Systems';
import { useResize, getWindowSize } from './useResize';

import styles from './Game.module.scss';

export const Game = () => {
  const [score, updateScore] = useState(0);
  const [size, setSize] = useState(getWindowSize());
  const entities = useRef(initEntities(size));
  const systems = useRef([TouchSystem, ShotSystem, EnemySystem, DestroySystem]);

  const onEvent = useCallback((event: GameEvent) => {
    if (event.type === 'score') {
      updateScore(score + 1);
    }
  }, []);

  useResize(() => setSize(getWindowSize()));

  return (
    <div className={styles.container}>
      <GameEngine
        className={styles.game}
        entities={entities.current}
        size={size}
        systems={systems.current}
        onEvent={onEvent}
      />
      <div className={styles.score}>{score}</div>
    </div>
  );
};
