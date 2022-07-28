/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import Questioner, { Mode } from 'components/templates/questioner';
import Chat from 'components/templates/chat';
import { MessageType } from 'components/molecules/message';
import AnswerInput from 'components/templates/answerinput';

const Game: FC = () => {
  const mode: Mode = 'easy';
  const questions: string[] = [
    '富士山',
    'おんぷ',
    '北海道',
    '日曜日',
    '顕微鏡',
    'あいぱっど',
    '充電器',
    '時計',
    '針',
    '照明',
    '関節',
    'ドア',
    '間接照明',
  ];
  const isAnswered = false;
  const messages: MessageType[] = [
    { id: 1, name: 'うみねずみ', type: 'answer', value: '北海道' },
    { id: 2, name: 'ソルトリバー', type: 'answer', value: '奈良県' },
    { id: 3, name: 'うみねずみ', type: 'answer', value: '京都' },
  ];

  const gameView = css({
    display: 'grid',
    gridTemplateColumns: '60% 40%',
  });

  return (
    <>
      <div>初級モード</div>
      <div css={gameView}>
        <Questioner mode={mode} questions={questions} isAnswered={isAnswered} />
        <Chat messages={messages} />
        <AnswerInput />
      </div>
    </>
  );
};

export default Game;
