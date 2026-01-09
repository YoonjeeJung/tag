import React, { useEffect, useRef } from 'react';
import type { ProblemHtml } from '../../types';
import { renderKatex } from '../../utils/katexUtils';
import styles from './ProblemContent.module.css';

interface ProblemContentProps {
  problemHtml: ProblemHtml;
}

const ProblemContent: React.FC<ProblemContentProps> = ({ problemHtml }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      renderKatex(contentRef.current);
    }
  }, [problemHtml]);

  const hasContent =
    problemHtml.question_html ||
    problemHtml.choice_html ||
    problemHtml.explanation_html ||
    problemHtml.correct_answer_html;

  return (
    <div className={styles.leftSection}>
      <div className={styles.sectionHeader}>문제 내용</div>
      <div className={styles.problemContent} ref={contentRef}>
        {hasContent ? (
          <>
            {problemHtml.question_html && (
              <div className={styles.section}>
                <h3>문제</h3>
                <div dangerouslySetInnerHTML={{ __html: problemHtml.question_html }} />
              </div>
            )}
            {problemHtml.choice_html && (
              <div className={styles.section}>
                <h3>선택지</h3>
                <div dangerouslySetInnerHTML={{ __html: problemHtml.choice_html }} />
              </div>
            )}
            {problemHtml.explanation_html && (
              <div className={styles.section}>
                <h3>해설</h3>
                <div dangerouslySetInnerHTML={{ __html: problemHtml.explanation_html }} />
              </div>
            )}
            {problemHtml.correct_answer_html && (
              <div className={styles.section}>
                <h3>정답</h3>
                <div dangerouslySetInnerHTML={{ __html: problemHtml.correct_answer_html }} />
              </div>
            )}
          </>
        ) : (
          <p className={styles.noContent}>문제 내용이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ProblemContent;
