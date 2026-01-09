import React, { useEffect, useRef } from 'react';
import { renderKatex } from '../../utils/katexUtils';
import styles from './LatexOutput.module.css';

interface LatexOutputProps {
  content: string;
  generatable: boolean | null;
}

const LatexOutput: React.FC<LatexOutputProps> = ({ content, generatable }) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      renderKatex(outputRef.current);
    }
  }, [content]);

  const copyOutput = () => {
    if (outputRef.current) {
      const range = document.createRange();
      range.selectNode(outputRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      try {
        document.execCommand('copy');
        alert('렌더링된 결과가 클립보드에 복사되었습니다!');
      } catch {
        alert('복사에 실패했습니다.');
      }
      window.getSelection()?.removeAllRanges();
    }
  };

  return (
    <div className={styles.outputSection}>
      <div className={styles.sectionHeader}>
        렌더링 결과
        <button className={styles.copyButton} onClick={copyOutput}>
          결과 복사
        </button>
      </div>

      {generatable !== null && (
        <div className={styles.genStatus}>
          <span className={styles.label}>Twin 생성 가능 여부:</span>
          <span className={generatable ? styles.badgeTrue : styles.badgeFalse}>
            GENERATABLE: {generatable ? 'TRUE' : 'FALSE'}
          </span>
        </div>
      )}

      <div className={styles.outputContent} ref={outputRef}>
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <p className={styles.placeholder}>
            왼쪽에 LaTeX 코드를 입력하거나 JSON 파일을 업로드하면 여기에 렌더링된 결과가 표시됩니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatexOutput;
