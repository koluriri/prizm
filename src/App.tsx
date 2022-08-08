/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect } from 'react';
import shuffle from 'lodash/shuffle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice } from 'ducks/user';
import { gameSlice } from 'ducks/game';

import { GameObj, Mode, PrefectureStr, Questions } from 'data/types';
import { listenGame, writeNewGame, deleteUser } from 'hooks/database';
import { prefecture } from 'data/prefecture';

import Game from 'components/pages/game';
import Home from 'components/pages/home';
import './App.css';

const App: FC = () => {
  const userName = useSelector((state: RootState) => state.user.name);
  const userKey = useSelector((state: RootState) => state.user.key);
  const dispatch = useDispatch();
  const { unsetUserKey } = userSlice.actions;
  const { setGameKey, setGameEntity, unsetGame } = gameSlice.actions;

  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameObj = useSelector((state: RootState) => state.game.entity);

  // setGameは別ファイルにしたほうが分けたほうがいいと思う
  const setGame = (mode: Mode, users: string[]) => {
    const created = new Date();
    const randomPref: PrefectureStr = shuffle(prefecture)[0];

    const write = (questions: Questions) =>
      writeNewGame({
        answer: randomPref,
        questions,
        mode,
        startBy: userName,
        messages: [],
        users,
        created: `${created.getFullYear()}-${
          created.getMonth() + 1
        }-${created.getDate()} ${created.getHours()}:${
          created.getMinutes() + 1
        }:${created.getSeconds()}`.replace(/\n|\r/g, ''),
      });

    const importPath = mode === 'station' ? 'stations' : 'cities';
    import(`data/${importPath}`)
      .then((data: typeof import('./data/cities')) => {
        write(shuffle(data.default()[randomPref]).slice(0, 30));
      })
      .catch((err) => {
        alert('データを読み込めませんでした');
        console.log(err);
      });
  };

  useEffect(() => {
    if (userKey !== '') {
      // eslint-disable-next-line consistent-return
      listenGame(userKey, (data) => {
        if (!data.key || gameKey !== '') return false;

        deleteUser(userKey);
        dispatch(unsetUserKey());

        dispatch(setGameKey(data.key));
        dispatch(setGameEntity(data.val() as GameObj));
        console.log(`new game: ${data.key}`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameKey, userKey]);

  useEffect(() => {
    const callback = () => deleteUser(userKey);
    window.addEventListener('beforeunload', callback);

    return () => window.removeEventListener('beforeunload', callback);
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
        <Game
          setHome={() => dispatch(unsetGame())}
          gameKey={gameKey}
          gameObj={gameObj}
        />
      ) : (
        <Home setGame={setGame} />
      )}
    </div>
  );
};

export default App;
