/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { initialUserName, userSlice } from 'ducks/user';
import { gameSlice } from 'ducks/game';

import { GameObj, localScoreKey, localUserNameKey } from 'data/types';
import { listenGame, deleteUser, newOnlineUser } from 'utils/database';
import useUserName from 'hooks/use-username';

import Game from 'components/pages/game';
import Home from 'components/pages/home';
import EditUser from 'components/pages/edituser';
import './App.css';

const App: FC = () => {
  const userName = useUserName();
  const userKey = useSelector((state: RootState) => state.user.key);
  const dispatch = useDispatch();
  const { setUserKey, unsetUserKey } = userSlice.actions;
  const { setGameKey, setGameEntity, unsetGame } = gameSlice.actions;

  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameObj = useSelector((state: RootState) => state.game.entity);

  const [editUserMode, setEditUserMode] = useState(false);

  useEffect(() => {
    if (userKey === '' && gameKey === '' && !editUserMode) {
      dispatch(
        setUserKey(
          newOnlineUser({
            userName: localStorage.getItem(localUserNameKey) || initialUserName,
            pingStamp: Date.now(),
            score:
              parseInt(String(localStorage.getItem(localScoreKey)), 10) || 0,
          }),
        ),
      );
      console.log('dispatch setUserKey & newOnlineUser');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey, gameKey, userName, editUserMode]);

  useEffect(() => {
    if (userKey !== '') {
      // eslint-disable-next-line consistent-return
      listenGame(userKey, (data) => {
        if (!data.key) return false;

        deleteUser(userKey);
        dispatch(unsetUserKey());
        dispatch(setGameKey(data.key));
        dispatch(setGameEntity(data.val() as GameObj));

        console.log(`new game: ${data.key}`);
      });
    }

    const callback = () => {
      if (userKey !== '') deleteUser(userKey);
    };
    window.addEventListener('beforeunload', callback);

    return () => window.removeEventListener('beforeunload', callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);

  useEffect(() => {
    if (userKey !== '' && editUserMode) {
      deleteUser(userKey);
      dispatch(unsetUserKey());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editUserMode]);

  return (
    <div
      css={css({
        width: '560px',
        maxWidth: '100%',
        minHeight: '100vh',
        padding: '10px',
        margin: '0 auto',
      })}
    >
      {!editUserMode &&
        (gameKey !== '' && gameObj ? (
          <Game setHome={() => dispatch(unsetGame())} />
        ) : (
          <Home editMode={() => setEditUserMode(true)} />
        ))}
      {editUserMode && <EditUser toHome={() => setEditUserMode(false)} />}
    </div>
  );
};

export default App;
