import React from 'react';

import { Modal } from 'Component/Modal';

import styles from './Result.module.scss';

interface IProps {
  score: number;
  start: () => void;
}

export const Result: React.FC<IProps> = ({ score, start }) => {
  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.title}>
          <h4>Game over</h4>
          <span>{score}</span>
        </div>
        <button onClick={start}>Start</button>
      </div>
    </Modal>
  );
};
