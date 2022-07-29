/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import shuffle from 'lodash/shuffle';

import Questioner, { Mode } from 'components/templates/questioner';
import Chat from 'components/templates/chat';
import { MessageObject } from 'components/molecules/message';
import AnswerInput from 'components/templates/answerinput';

import { prefecture } from 'data/prefecture';
import cities from 'data/cities';

const Game: FC<{ setHome: () => void }> = ({ setHome }) => {
  const [isDuringGame, setIsDuringGame] = useState(true);
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const setMessage = (message: MessageObject) =>
    setMessages((histories) => [...histories, message]);

  const [mode, setMode] = useState<Mode>('easy');
  const [answer, setAnswer] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    // 都道府県をランダムに取得
    const randomPref = shuffle(prefecture)[0];
    setAnswer(randomPref);
    setQuestions(shuffle(cities[randomPref]).slice(0, 30));
    setIsDuringGame(true);
    setMode('hard');
  }, []);

  console.log(answer);
  console.log(questions);
  console.log(isDuringGame);

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
