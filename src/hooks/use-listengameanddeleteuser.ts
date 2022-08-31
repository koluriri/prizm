import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice } from 'ducks/user';
import { gameSlice } from 'ducks/game';

import { GameObj } from 'utils/types';
import { deleteUser, listenGame } from 'utils/database';

const useListenGameAndDeleteUser = () => {
  const userKey = useSelector((state: RootState) => state.user.key);
  const dispatch = useDispatch();
  const { unsetUserKey } = userSlice.actions;
  const { setGameKey, setGameEntity } = gameSlice.actions;

  useEffect(() => {
    if (userKey !== '') {
      listenGame(userKey, (data) => {
        if (!data.key) return false;

        deleteUser(userKey);
        dispatch(unsetUserKey());
        dispatch(setGameKey(data.key));
        dispatch(setGameEntity(data.val() as GameObj));

        return true;
      });
    }

    const callback = () => {
      if (userKey !== '') deleteUser(userKey);
    };
    window.addEventListener('beforeunload', callback);

    return () => window.removeEventListener('beforeunload', callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);
};

export default useListenGameAndDeleteUser;
