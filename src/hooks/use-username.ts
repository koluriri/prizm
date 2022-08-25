import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice, initialUserName } from 'ducks/user';
import { localUserColorKey, localUserNameKey } from 'data/types';
import { generateColor, generateName } from 'utils/generateuser';

const useUserName = (): string => {
  const userName = useSelector((state: RootState) => state.user.name);
  const dispatch = useDispatch();
  const { setUserName } = userSlice.actions;

  if (userName !== initialUserName) return userName;

  if (!localStorage.getItem(localUserColorKey))
    localStorage.setItem(localUserColorKey, generateColor());

  const localUserName = localStorage.getItem(localUserNameKey);
  if (
    localUserName &&
    localUserName !== '' &&
    localUserName !== initialUserName
  ) {
    dispatch(setUserName(localUserName));

    return localUserName;
  }

  const name = generateName();

  localStorage.setItem(localUserNameKey, name);
  dispatch(setUserName(name));

  return name;
};

export default useUserName;
