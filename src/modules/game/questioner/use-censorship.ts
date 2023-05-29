import { useCallback } from 'react';

const useCensorship = () =>
  useCallback((question: string, show: boolean): string => {
    const pattern = /\{\{([^}]+)\}\}/g;

    if (!show)
      return question.replace(pattern, (match, p1: string) =>
        '█'.repeat(p1.length),
      );

    return question.replace(pattern, (match, p1: string) => p1);
  }, []);

export default useCensorship;
