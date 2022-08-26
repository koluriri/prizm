/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, FormEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import useJudger from 'hooks/use-judger';
import { pushMessage } from 'utils/database';
import { initialRemain } from 'data/types';
import canonicalizePref from 'utils/canonicalizepref';

const AnswerInput: FC<{
  setHome: () => void;
}> = ({ setHome }) => {
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  const gameKey = useSelector((state: RootState) => state.game.key);

  const [answerInputValue, setAnswerInputValue] = useState('');
  const [judge] = useJudger();

  const [remain, setRemain] = useState(initialRemain);

  const [[canonicalized, suggest], setCanonicalized] = useState<
    [string | false, string]
  >([false, '']);

  const answerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canonicalized && canonicalized !== '') {
      if (remain <= 0) {
        pushMessage(gameKey, {
          type: 'remain',
          value: `もう残機がありません`,
        });
      } else {
        setRemain((state) => state - 1);
        judge(canonicalized);
        setAnswerInputValue('');
        setCanonicalized([false, suggest]);
      }
    }
  };

  return (
    <div
      css={css`
        grid-column: 1 / 3;
        position: relative;
        height: 45px;

        @media (min-width: 768px) {
          grid-column: 2 / 3;
        }
      `}
    >
      {isDuringGame ? (
        <form onSubmit={(e) => answerSubmit(e)}>
          <p
            css={css`
              position: absolute;
              pointer-events: none;
              font-weight: 500;
              font-size: 23px;
              opacity: 0.5;
              display: flex;
              align-items: center;
              padding: 0 19px;
              margin: 3px;
              line-height: 1;
              white-space: nowrap;
              height: 45px;
              vertical-align: middle;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            `}
          >
            {canonicalized && (
              <>
                <span
                  css={css`
                    font-weight: 500;
                    opacity: 0;
                  `}
                >
                  {answerInputValue}
                </span>{' '}
                {suggest.slice(answerInputValue.length)} (Enterで送信）
              </>
            )}
          </p>
          <div
            css={css`
              height: 45px;
              pointer-events: none;
              position: absolute;
              top: 0;
              right: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 3px;
            `}
          >
            ♥×{remain}
          </div>
          <input
            type="text"
            className="bordercomp"
            css={css`
              width: 100%;
              height: 45px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 23px;
              font-weight: 900;
              position: absolute;
              padding-right: 53px;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            `}
            value={answerInputValue}
            onChange={(e) => {
              setAnswerInputValue(e.target.value);
              setCanonicalized(canonicalizePref(e.target.value));
            }}
          />
        </form>
      ) : (
        <button type="button" onClick={() => setHome()}>
          おわる
        </button>
      )}
    </div>
  );
};

export default AnswerInput;
