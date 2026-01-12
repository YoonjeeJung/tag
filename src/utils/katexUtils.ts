import renderMathInElement from 'katex/contrib/auto-render';

export const KATEX_DELIMITERS = [
  { left: '$$', right: '$$', display: true },
  { left: '$', right: '$', display: false },
  { left: '\\(', right: '\\)', display: false },
  { left: '\\[', right: '\\]', display: true },
];

/**
 * KaTeX 렌더링 함수
 * DOM 업데이트 이후에 실행되도록 requestAnimationFrame 사용
 */
export const renderKatex = (element: HTMLElement | null): void => {
  if (!element) return;

  requestAnimationFrame(() => {
    if (element) {
      try {
        renderMathInElement(element, {
          delimiters: KATEX_DELIMITERS,
          throwOnError: false,
          trust: true,
          ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
          ignoredClasses: ['no-katex'],
        });
      } catch (e) {
        console.error('KaTeX rendering error:', e);
      }
    }
  });
};
