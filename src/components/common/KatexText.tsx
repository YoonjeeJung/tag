import React, { useEffect, useRef, memo } from 'react';
import renderMathInElement from 'katex/contrib/auto-render';

const KATEX_DELIMITERS = [
  { left: '$$', right: '$$', display: true },
  { left: '$', right: '$', display: false },
  { left: '\\(', right: '\\)', display: false },
  { left: '\\[', right: '\\]', display: true },
];

interface KatexTextProps {
  children: string;
  className?: string;
}

/**
 * KaTeX 렌더링이 필요한 텍스트를 표시하는 컴포넌트
 * React.memo로 감싸서 텍스트가 변경되지 않으면 리렌더링 방지
 */
const KatexText: React.FC<KatexTextProps> = memo(({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // 먼저 텍스트 내용을 설정
      ref.current.textContent = children;
      // 그 다음 KaTeX 렌더링
      renderMathInElement(ref.current, {
        delimiters: KATEX_DELIMITERS,
        throwOnError: false,
        trust: true,
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      });
    }
  }, [children]);

  return <div ref={ref} className={className} />;
});

KatexText.displayName = 'KatexText';

export default KatexText;
