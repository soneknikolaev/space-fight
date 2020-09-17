import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';

import { GameEngine, GameEngineRef } from './GameEngine';
import initEntities from './Entities';
import { DestroySystem, TouchSystem, EnemySystem, BulletSystem } from './Systems';
import { useResize, getWindowSize } from './useResize';

import styles from './Game.module.scss';

export const Game = () => {
  const ref: GameEngineRef = useRef(null);
  const [score, updateScore] = useState(0);
  const [level, updateLevel] = useState<GameLevel>('EASY');
  const [size, setSize] = useState(getWindowSize());
  const entities = useMemo(() => initEntities(size), [size]);
  const systems = useRef([TouchSystem, BulletSystem, EnemySystem, DestroySystem]);

  const onEvent = useCallback((event: GameEvent) => {
    if (event.type === 'score') {
      updateScore((a) => a + 1);
    }
  }, []);

  useEffect(() => {
    if (score > 10) {
      updateLevel('MEDIUM');
    }

    if (score > 20) {
      updateLevel('HARD');
    }

    if (score > 30) {
      updateLevel('EXTREME');
    }
  }, [score]);

  useEffect(() => {
    if (ref.current) {
      ref.current.dispatchEvent({
        level,
        type: 'level',
      });
    }
  }, [ref, level]);

  useResize(() => setSize(getWindowSize()));

  return (
    <div className={styles.container}>
      <GameEngine
        className={styles.game}
        ref={ref}
        entities={entities}
        size={size}
        systems={systems.current}
        onEvent={onEvent}
      />
      <div className={styles.score}>{score}</div>
    </div>
  );
};
