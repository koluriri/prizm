import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { initialUserName, userSlice } from 'ducks/user';
import { deleteUser, newOnlineUser } from 'utils/database';
import { localScoreKey, localUserColorKey, localUserNameKey } from 'data/types';
import useGetDevice from 'hooks/use-getdevice';

export const useToOnline = () => {
  const dispatch = useDispatch();
  const { setUserKey } = userSlice.actions;

  const getDevice = useGetDevice();

  return () => {
    dispatch(
      setUserKey(
        newOnlineUser({
          userName: localStorage.getItem(localUserNameKey) || initialUserName,
          color: localStorage.getItem(localUserColorKey) || '',
          pingStamp: Date.now(),
          device: getDevice(),
          score: parseInt(String(localStorage.getItem(localScoreKey)), 10) || 0,
        }),
      ),
    );
  };
};

export const useToOffline = () => {
  const userKey = useSelector((state: RootState) => state.user.key);
  const dispatch = useDispatch();
  const { unsetUserKey } = userSlice.actions;

  return () => {
    deleteUser(userKey);
    dispatch(unsetUserKey());
  };
};
