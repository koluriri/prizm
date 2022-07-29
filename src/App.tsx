/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useState } from 'react';
import Game from 'components/pages/game';
import Home from 'components/pages/home';

import './App.css';

const container = css({
  width: '560px',
  maxWidth: '100%',
  minHeight: '100vh',
  padding: '10px',
  margin: '0 auto',
});

const App: FC = () => {
  const [isGame, setIsGame] = useState(false);
  const setGame = () => setIsGame(true);
  const setHome = () => setIsGame(false);

  return (
    <div css={container}>
      {isGame ? <Game setHome={setHome} /> : <Home setGame={setGame} />}
    </div>
  );
};

export default App;
