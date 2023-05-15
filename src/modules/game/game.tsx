/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import Questioner from 'modules/game/questioner/questioner';
import Chat from 'modules/game/chat/chatcontainer';
import AnswerInput from 'modules/game/answerinput/answerinput';

import useFitScreenHeight from 'modules/game/use-fitScreenHeight';
import useGameStarted from 'modules/game/use-gamestarted';

const Game: FC<{
  setHome: () => void;
}> = ({ setHome }) => {
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  const finishGame = useGameStarted();

  const gameHeight = useFitScreenHeight();
  const gameWrapper = css`
    height: ${gameHeight}px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const gameContent = css`
    height: ${gameHeight - 20}px;
    max-height: 600px;
    padding: 0 30px;
    width: 730px;
    max-width: 100vw;
    display: grid;
    grid-template-columns: 1fr minmax(140px, 40%);
    grid-template-rows: 1fr ${isDuringGame ? '49px' : '118px'};
    grid-template-areas:
      'questioner chat'
      'answerinput answerinput';

    ${isDuringGame &&
    css`
      @media (min-width: 768px) {
        grid-template-areas:
          'questioner chat'
          'questioner answerinput';
      }
    `}
  `;

  return (
    <div className="gamewrapper" css={gameWrapper}>
      <div className="gamegrid" css={gameContent}>
        <Questioner finishGame={() => finishGame()} />
        <Chat />
        <AnswerInput setHome={setHome} />
      </div>
    </div>
  );
};

export default Game;
