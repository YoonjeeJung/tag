import React from 'react';
import styles from './NecessityControls.module.css';

interface NecessityControlsProps {
  value: boolean | null;
  onSetTrue: () => void;
  onSetFalse: () => void;
}

const NecessityControls: React.FC<NecessityControlsProps> = ({ value, onSetTrue, onSetFalse }) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.radio} ${styles.radioTrue} ${value === true ? styles.active : ''}`}
        onClick={onSetTrue}
      >
        <span className={styles.radioCircle}></span>
        <span className={styles.radioLabel}>필요</span>
      </div>
      <div
        className={`${styles.radio} ${styles.radioFalse} ${value === false ? styles.active : ''}`}
        onClick={onSetFalse}
      >
        <span className={styles.radioCircle}></span>
        <span className={styles.radioLabel}>불필요</span>
      </div>
    </div>
  );
};

export default NecessityControls;
