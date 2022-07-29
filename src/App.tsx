/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import Game from 'components/pages/game';
import Home from 'components/pages/home';

import { listenGame, writeNewGame } from 'hooks/database';

import './App.css';
import { GameObj } from 'data/types';

const App: FC = () => {
  const [isGame, setIsGame] = useState(false);
  const setGame = () => {
    // setIsGame(true);
    const game: GameObj = {
      answer: '三重県',
      questions: ['やかん', 'みかん', 'あかん', 'いかん', 'おかん'],
      mode: 'hard',
      status: 'active',
      messages: [],
      users: ['aaa', 'nezumi', 'gohan'],
      created: '2022-07-30 04:15:04',
    };
    writeNewGame(game);
  };
  const setHome = () => setIsGame(false);

  /* メモ
  listenGameで、ゲームが開始されたらsetIsGame(true)するようにした。
  このままだと、初回ロード時にすべてのGameがlistenGameのcallbackに渡されて、
  アクセスしたらゲームが始まってしまうので、
  - listenGameで、ユーザーIDの照合を行う
  - ゲームが終了、またはアンマウントされたら、該当ゲームを削除する処理
  をする。削除までしなくてもいい気もするけど。。何かいい方法がないか。
  とりあえずgameKeyはstateに保管しといたほうがいいと思う。
  あと、setGameをちゃんと作れば、もうわりとできてしまいそう。
   */

  useEffect(() => {
    listenGame((data) => {
      setIsGame(true);
      console.log('new game!');
      console.log(data.key);
    });
  }, []);

  const container = css({
    width: '560px',
    maxWidth: '100%',
    minHeight: '100vh',
    padding: '10px',
    margin: '0 auto',
  });

  return (
    <div css={container}>
      {isGame ? <Game setHome={setHome} /> : <Home setGame={setGame} />}
    </div>
  );
};

export default App;
