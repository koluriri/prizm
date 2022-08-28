/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, FormEvent, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import useJudger from 'hooks/use-judger';
import { initialRemain } from 'data/types';
import canonicalizePref from 'utils/canonicalizepref';

import { FaHeart, FaTimes } from 'react-icons/fa';

const AnswerInput: FC<{
  setHome: () => void;
}> = ({ setHome }) => {
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  const [answerInputValue, setAnswerInputValue] = useState('');
  const [judge] = useJudger();

  const [remain, setRemain] = useState(initialRemain);

  const [[canonicalized, suggest], setCanonicalized] = useState<
    [string | false, string]
  >([false, '']);

  const [errorMessage, setErrorMessage] = useState('');

  const answerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canonicalized && canonicalized !== '') {
      if (remain <= 0) {
        setErrorMessage('残機がありません');
      } else {
        setRemain((state) => state - 1);
        judge(canonicalized);
        setAnswerInputValue('');
        setCanonicalized([false, suggest]);
      }
    } else {
      setErrorMessage('都道府県を入力してください');
    }
  };

  useEffect(() => {
    if (errorMessage !== '') {
      setTimeout(() => {
        setErrorMessage('');
      }, 1500);
    }
  }, [errorMessage]);

  return (
    <div
      className="answerinput"
      css={css`
        grid-area: answerinput;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        ${errorMessage !== '' && 'animation: 0.4s ease 0s 1 normal blink;'}
      `}
    >
      {isDuringGame ? (
        <form onSubmit={(e) => answerSubmit(e)}>
          {!!errorMessage && (
            <p
              css={css`
                pointer-events: none;
                position: absolute;
                top: -29px;
                left: 10px;
                width: fit-content;
                background: var(--red);
                color: var(--bg-color);
                border-radius: 20px;
                line-height: 1;
                padding: 4px 8px;
                margin: 0;
              `}
            >
              {errorMessage}
            </p>
          )}
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
                {suggest.slice(answerInputValue.length)} (改行で送信)
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
            <FaHeart />
            <FaTimes size={10} css={{ margin: '0 1px;' }} />
            {remain}
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
        <>
          {/* <button
            type="button"
            onClick={() => alert('まだ')}
            className="bordercomp"
          >
            ツイート
            <FaTwitter
              css={css`
                margin-left: 3px;
              `}
            />
      </button> */}
          <button
            type="button"
            onClick={() => setHome()}
            className="button-hinomaru"
            css={css`
              margin: 10px 0 /*10px 20px*/;

              /*@media (min-width: 768px) {
                margin-left: 80px;
              }*/
            `}
          >
            おわる
          </button>
        </>
      )}
    </div>
  );
};

export default AnswerInput;
