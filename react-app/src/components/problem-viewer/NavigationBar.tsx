import React, { useState } from 'react';
import { Button } from '../common';
import styles from './NavigationBar.module.css';

interface NavigationBarProps {
  currentIndex: number;
  totalCount: number;
  onFirst: () => void;
  onPrev10: () => void;
  onPrev: () => void;
  onNext: () => void;
  onNext10: () => void;
  onLast: () => void;
  onGoToIndex: (index: number) => void;
  onSearchByProblemId: (problemId: number) => boolean;
  onEnableEditMode: () => void;
  isEditModeEnabled: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  currentIndex,
  totalCount,
  onFirst,
  onPrev10,
  onPrev,
  onNext,
  onNext10,
  onLast,
  onGoToIndex,
  onSearchByProblemId,
  onEnableEditMode,
  isEditModeEnabled,
}) => {
  const [indexInput, setIndexInput] = useState('');
  const [problemIdInput, setProblemIdInput] = useState('');

  const handleIndexSearch = () => {
    const index = parseInt(indexInput);
    if (index >= 1 && index <= totalCount) {
      onGoToIndex(index - 1);
      setIndexInput('');
    } else {
      alert(`올바른 번호를 입력하세요 (1-${totalCount})`);
    }
  };

  const handleProblemIdSearch = () => {
    const problemId = parseInt(problemIdInput);
    if (!problemId || isNaN(problemId)) {
      alert('올바른 Problem ID를 입력하세요');
      return;
    }

    const found = onSearchByProblemId(problemId);
    if (found) {
      setProblemIdInput('');
    } else {
      alert(`Problem ID ${problemId}를 찾을 수 없습니다`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className={styles.navigationBar}>
      <div className={styles.navControls}>
        <Button variant="nav" onClick={onFirst} disabled={currentIndex === 0}>
          ⏮ 맨 앞
        </Button>
        <Button variant="nav" onClick={onPrev10} disabled={currentIndex === 0}>
          ⏪ 10개 앞
        </Button>
        <Button variant="nav" onClick={onPrev} disabled={currentIndex === 0}>
          ◀ 이전
        </Button>
        <div className={styles.problemCounter}>
          {currentIndex + 1} / {totalCount}
        </div>
        <Button variant="nav" onClick={onNext} disabled={currentIndex === totalCount - 1}>
          다음 ▶
        </Button>
        <Button variant="nav" onClick={onNext10} disabled={currentIndex >= totalCount - 1}>
          10개 뒤 ⏩
        </Button>
        <Button variant="nav" onClick={onLast} disabled={currentIndex === totalCount - 1}>
          맨 뒤 ⏭
        </Button>
      </div>

      <div className={styles.searchSection}>
        <span className={styles.searchLabel}>번호:</span>
        <input
          type="number"
          className={styles.searchInput}
          placeholder="번호 입력"
          min="1"
          value={indexInput}
          onChange={(e) => setIndexInput(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, handleIndexSearch)}
        />
        <button className={styles.searchButton} onClick={handleIndexSearch}>
          이동
        </button>

        <span className={styles.searchLabel} style={{ marginLeft: 15 }}>
          Problem ID:
        </span>
        <input
          type="number"
          className={styles.searchInput}
          placeholder="ID 입력"
          value={problemIdInput}
          onChange={(e) => setProblemIdInput(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, handleProblemIdSearch)}
        />
        <button className={styles.searchButton} onClick={handleProblemIdSearch}>
          검색
        </button>

        <button
          className={`${styles.searchButton} ${styles.editModeButton}`}
          onClick={onEnableEditMode}
          disabled={isEditModeEnabled}
          style={{ marginLeft: 15 }}
        >
          {isEditModeEnabled ? '✓ 편집 모드 활성화됨' : '편집 모드로 열기'}
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
