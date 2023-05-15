import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { Users } from 'utils/types';
import { listenUsers, updatePingStamp } from 'utils/database';
import useAudio from 'hooks/use-audio';

const useUserMounted = () => {
  const userKey = useSelector((state: RootState) => state.user.key);

  const [users, setUsers] = useState<Users>();

  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = () => clearInterval(timerId.current);

  const playSE = useAudio();

  useEffect(() => {
    listenUsers((data) => {
      setUsers((prevUsers) => {
        const prevKeys = Object.keys(prevUsers ?? {});
        const currentKeys = Object.keys(data ?? {}).filter(
          (key) => Date.now() - data[key].pingStamp < 7700,
        );
        if (JSON.stringify(prevKeys) !== JSON.stringify(currentKeys)) {
          if (prevKeys < currentKeys) playSE('online');
          if (prevKeys > currentKeys) playSE('offline');
        }

        return currentKeys.reduce((result: Users, ObjectKey: string) => {
          // eslint-disable-next-line no-param-reassign
          result[ObjectKey] = data[ObjectKey];

          return result;
        }, {});
      });
    });

    document.body.style.backgroundColor = 'var(--bg-color)';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (userKey && users && Object.keys(users).includes(userKey)) {
        updatePingStamp(userKey);
      }
    }, 3000);

    return clearTimer;
  }, [userKey, users]);

  return users;
};

export default useUserMounted;
