/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice } from 'ducks/user';
import { gameSlice } from 'ducks/game';

import { GameObj } from 'data/types';
import { listenGame, deleteUser, newOnlineUser } from 'utils/database';
import useUserName from 'hooks/use-username';

import Game from 'components/pages/game';
import Home from 'components/pages/home';
import './App.css';

const App: FC = () => {
  const userName = useUserName();
  const userKey = useSelector((state: RootState) => state.user.key);
  const dispatch = useDispatch();
  const { setUserKey, unsetUserKey } = userSlice.actions;
  const { setGameKey, setGameEntity, unsetGame } = gameSlice.actions;

  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameObj = useSelector((state: RootState) => state.game.entity);

  useEffect(() => {
    if (userKey === '' && gameKey === '') {
      dispatch(setUserKey(newOnlineUser({ userName })));
      console.log('dispatch setUserKey & newOnlineUser');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey, gameKey, userName]);

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
      {gameKey !== '' && gameObj ? (
        <Game setHome={() => dispatch(unsetGame())} />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default App;
