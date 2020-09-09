import React, { useState, useCallback, useRef, useMemo } from 'react';

import { GameEngine } from './GameEngine';
import initEntities from './Entities';
import { DestroySystem, TouchSystem, EnemySystem, BulletSystem } from './Systems';
import { useResize, getWindowSize } from './useResize';

import styles from './Game.module.scss';

export const Game = () => {
  const [score, updateScore] = useState(0);
  const [size, setSize] = useState(getWindowSize());
  const entities = useMemo(() => initEntities(size), [size]);
  const systems = useRef([TouchSystem, BulletSystem, EnemySystem, DestroySystem]);

  const onEvent = useCallback((event: GameEvent) => {
    if (event.type === 'score') {
      updateScore((a) => a + 1);
    }
  }, []);

  useResize(() => setSize(getWindowSize()));

  return (
    <div className={styles.container}>
      <GameEngine className={styles.game} entities={entities} size={size} systems={systems.current} onEvent={onEvent} />
      <div className={styles.score}>{score}</div>
    </div>
  );
};
