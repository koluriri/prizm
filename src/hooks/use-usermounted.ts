import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { Users } from 'data/types';
import { listenUsers, updatePingStamp } from 'utils/database';

const useUserMounted = () => {
  const userKey = useSelector((state: RootState) => state.user.key);

  const [users, setUsers] = useState<Users>();

  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = () => clearInterval(timerId.current);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (userKey) updatePingStamp(userKey);
    }, 3000);

    listenUsers((data) => {
      setUsers(data);
    });

    document.body.style.backgroundColor = 'var(--bg-color)';

    return clearTimer;
  }, [userKey]);

  return users;
};

export default useUserMounted;
