import React, { useEffect, useState } from 'react';

import { GameEngine } from './GameEngine';
import { initEntities } from './Entities';
import { DestroySystem, TouchSystem, EnemySystem, ShotSystem } from './Systems';

import styles from './Game.module.scss';

const getWindowSize = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const Game = () => {
  const [size, setSize] = useState(getWindowSize());

  const onResize = () => setSize(getWindowSize());

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return function cleanup() {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const entities = initEntities(size);

  return (
    <div className={styles.container}>
      <GameEngine
        className={styles.game}
        entities={entities}
        size={size}
        systems={[TouchSystem, ShotSystem, EnemySystem, DestroySystem]}
      />
    </div>
  );
};
