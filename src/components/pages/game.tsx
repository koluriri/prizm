/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

import Questioner, { Mode } from 'components/templates/questioner';
import Chat from 'components/templates/chat';
import { MessageObject } from 'components/molecules/message';
import AnswerInput from 'components/templates/answerinput';

const Game: FC<{ setHome: () => void }> = ({ setHome }) => {
  const [isDuringGame, setIsDuringGame] = useState(true);
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const setMessage = (message: MessageObject) =>
    setMessages((histories) => [...histories, message]);

  const mode: Mode = 'hard';
  const answer = '神奈川';
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

  useEffect(() => {
    if (
      messages.find((message) => message.type === 'answer' && message.matched)
    )
      setIsDuringGame(false);
  }, [messages]);

  const gameView = css({
    display: 'grid',
    gridTemplateColumns: '40% 60%',
  });

  return (
    <div css={gameView}>
      <Chat messages={messages} />
      <Questioner
        mode={mode}
        questions={questions}
        isDuringGame={isDuringGame}
        finishGame={() => setIsDuringGame(false)}
      />
      <AnswerInput
        setMessage={setMessage}
        answer={answer}
        isDuringGame={isDuringGame}
        setHome={setHome}
      />
    </div>
  );
};

export default Game;
