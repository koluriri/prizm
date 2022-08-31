import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const useErrorMessage = (
  microsecond = 1500,
): [string, Dispatch<SetStateAction<string>>] => {
  const [errorMessage, setErrorMessage] = useState('');
  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = () => clearTimeout(timerId.current);
  useEffect(() => {
    if (errorMessage !== '') {
      clearTimer();
      timerId.current = setTimeout(() => {
        setErrorMessage('');
      }, microsecond);
    }
  }, [errorMessage, microsecond]);

  return [errorMessage, setErrorMessage];
};

export default useErrorMessage;
