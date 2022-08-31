import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice, initialUserName } from 'ducks/user';
import {
  isUserSummaryObj,
  localUserColorKey,
  localUserNameKey,
  localUserSummary,
} from 'utils/types';
import { useGenerateColor, useGenerateName } from 'hooks/use-generates';

const useUserName = (): string => {
  const userName = useSelector((state: RootState) => state.user.name);
  const dispatch = useDispatch();
  const { setUserName } = userSlice.actions;

  const generateColor = useGenerateColor();
  const generateName = useGenerateName();

  if (userName !== initialUserName) return userName;

  if (!localStorage.getItem(localUserColorKey))
    localStorage.setItem(localUserColorKey, generateColor());

  if (
    !localStorage.getItem(localUserSummary) ||
    !isUserSummaryObj(JSON.parse(localStorage.getItem(localUserSummary) ?? ''))
  )
    localStorage.setItem(
      localUserSummary,
      JSON.stringify({
        playCount: 0,
        wonCount: 0,
        lastPlay: 0,
        lastWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        averageSpeed: 0,
        fastestSpeed: 0,
      }),
    );

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
