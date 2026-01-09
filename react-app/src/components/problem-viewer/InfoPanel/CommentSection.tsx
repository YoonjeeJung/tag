import React from 'react';
import styles from './CommentSection.module.css';

interface CommentSectionProps {
  comment: string;
  onChange: (value: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comment, onChange }) => {
  return (
    <div className={styles.section}>
      <h3>검수 코멘트</h3>
      <textarea
        className={styles.textarea}
        value={comment}
        onChange={(e) => onChange(e.target.value)}
        placeholder="코멘트를 입력하세요..."
      />
    </div>
  );
};

export default CommentSection;
