import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

export const Modal: React.FC = ({ children }) => {
  const el = useRef(document.getElementById('modal'));
  if (!el.current) return null;
  return ReactDOM.createPortal(<div className={styles.container}>{children}</div>, el.current);
};
