import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice } from 'ducks/user';
import { gameSlice } from 'ducks/game';

import { GameObj, Mode } from 'utils/types';
import { deleteUser, listenGame } from 'utils/database';

const useListenGameAndDeleteUser = () => {
  const userKey = useSelector((state: RootState) => state.user.key);
  const dispatch = useDispatch();
  const { unsetUserKey } = userSlice.actions;
  const { setGameKey, setGameEntity } = gameSlice.actions;

  const [lastMode, setLastMode] = useState<Mode>('easy');

  const onFocus = () => {
    window.location.reload();
  };
  const onBlur = () => {
    if (userKey !== '') {
      deleteUser(userKey);
    }
  };

  const visibilitychangeCallback = () => {
    if (document.visibilityState === 'visible') onFocus();
    if (document.visibilityState === 'hidden') onBlur();
  };

  useEffect(() => {
    if (userKey !== '') {
      listenGame(userKey, (data) => {
        if (!data.key) return false;

        deleteUser(userKey);
        dispatch(unsetUserKey());
        dispatch(setGameKey(data.key));
        dispatch(setGameEntity(data.val() as GameObj));

        setLastMode((data.val() as GameObj).mode);

        return true;
      });
    }

    window.addEventListener('beforeunload', onBlur);
    window.addEventListener('unload', onBlur);
    window.addEventListener('pagehide', onBlur);
    document.addEventListener('visibilitychange', visibilitychangeCallback);
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('beforeunload', onBlur);
      window.removeEventListener('unload', onBlur);
      window.removeEventListener('pagehide', onBlur);
      document.removeEventListener(
        'visibilitychange',
        visibilitychangeCallback,
      );
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);

  return lastMode;
};

export default useListenGameAndDeleteUser;
