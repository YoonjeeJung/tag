import React from 'react';
import { Dropdown } from '../../common';
import { BEHAVIOR_AREA_OPTIONS } from '../../../types';
import { escapeHtml } from '../../../utils/dataUtils';
import styles from './BehaviorArea.module.css';

interface BehaviorAreaProps {
  behaviorArea?: string;
  behaviorReason?: string;
  behaviorAreaConfirmed: string;
  onConfirmedChange: (value: string) => void;
}

const BehaviorArea: React.FC<BehaviorAreaProps> = ({
  behaviorArea,
  behaviorReason,
  behaviorAreaConfirmed,
  onConfirmedChange,
}) => {
  if (!behaviorArea && !behaviorReason) {
    return null;
  }

  const options = BEHAVIOR_AREA_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  return (
    <div className={styles.section}>
      <h3>행동 영역</h3>
      {behaviorArea && (
        <div className={styles.field}>
          <div className={styles.label}>영역</div>
          <div className={styles.valueRow}>
            <div className={styles.originalValue}>{escapeHtml(behaviorArea)}</div>
            <div className={styles.dropdownContainer}>
              <Dropdown
                options={options}
                value={behaviorAreaConfirmed}
                placeholder="미선택"
                onChange={onConfirmedChange}
              />
            </div>
          </div>
        </div>
      )}
      {behaviorReason && (
        <div className={styles.field}>
          <div className={styles.label}>이유</div>
          <div className={styles.value}>{escapeHtml(behaviorReason)}</div>
        </div>
      )}
    </div>
  );
};

export default BehaviorArea;
