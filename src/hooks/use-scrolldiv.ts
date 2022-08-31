import { RefObject, useCallback, useRef } from 'react';

const useScrollDiv = (): [RefObject<HTMLDivElement>, () => void] => {
  const viewRef = useRef<HTMLDivElement>(null);

  return [
    viewRef,
    useCallback(() => {
      if (viewRef.current)
        viewRef.current.scrollBy({
          top: viewRef.current.scrollHeight,
          behavior: 'smooth',
        });
    }, [viewRef]),
  ];
};

export default useScrollDiv;
