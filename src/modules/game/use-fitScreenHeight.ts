import { useEffect, useState } from 'react';

const useFitScreenHeight = (): number => {
  const [gameHeight, setGameHeight] = useState(visualViewport.height);

  const onWindowResize = () => {
    window.scrollTo(0, 0);
    setGameHeight(visualViewport.height);
  };
  useEffect(() => {
    window.visualViewport.addEventListener('resize', onWindowResize);

    return () => {
      window.visualViewport.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return gameHeight;
};

export default useFitScreenHeight;
