import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice, initialUserName } from 'ducks/user';
import { localUserNameKey } from 'data/types';

const useUserName = (): string => {
  const userName = useSelector((state: RootState) => state.user.name);
  const dispatch = useDispatch();
  const { setUserName } = userSlice.actions;

  if (userName !== initialUserName) return userName;

  const localUserName = localStorage.getItem(localUserNameKey);
  if (
    localUserName &&
    localUserName !== '' &&
    localUserName !== initialUserName
  ) {
    dispatch(setUserName(localUserName));

    return localUserName;
  }

  const inputName = window.prompt(
    'プレイしたいユーザー名をおしえてください',
    '',
  );
  if (inputName) {
    localStorage.setItem(localUserNameKey, inputName);
    dispatch(setUserName(inputName));

    return inputName;
  }

  return initialUserName;
};

export default useUserName;
