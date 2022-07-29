/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, FormEvent, useState } from 'react';
import UserRemain from 'components/molecules/userremain';
import { MessageObject } from 'components/molecules/message';

const AnswerInput: FC<{
  setMessage: (message: MessageObject) => void;
  answer: string;
  isDuringGame: boolean;
  setHome: () => void;
}> = ({ setMessage, answer, isDuringGame, setHome }) => {
  const [answerInputValue, setAnswerInputValue] = useState('');

  const answerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answerInputValue) {
      setMessage({
        id: 1,
        name: 'うみねずみ',
        type: 'answer',
        matched: answer === answerInputValue,
        value: answerInputValue,
      });
      setAnswerInputValue('');
    }
  };

  const answerinput = css({ gridColumn: '1 / 3' });
  const formControl = css({
    width: '100%',
    border: '1px solid #ddd',
    padding: '8px 18px',
    fontSize: 'var(--font-size)',
    borderRadius: '8px',
    margin: '10px 0',
  });

  return (
    <div css={answerinput}>
      {isDuringGame ? (
        <>
          <UserRemain userId={1} />
          <form onSubmit={(e) => answerSubmit(e)}>
            <input
              type="text"
              css={formControl}
              value={answerInputValue}
              onChange={(e) => setAnswerInputValue(e.target.value)}
            />
          </form>
        </>
      ) : (
        <button type="button" onClick={() => setHome()}>
          おわる
        </button>
      )}
    </div>
  );
};

export default AnswerInput;
