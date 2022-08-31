/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import Questioner from 'components/templates/questioner';
import Chat from 'components/templates/chatcontainer';
import AnswerInput from 'components/templates/answerinput';
import useFitScreenHeight from 'hooks/use-fitScreenHeight';
import useGameStarted from 'hooks/use-gamestarted';

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
      <div css={gameContent}>
        <Questioner finishGame={() => finishGame()} />
        <Chat />
        <AnswerInput setHome={setHome} />
      </div>
    </div>
  );
};

export default Game;
