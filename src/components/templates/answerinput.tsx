/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import useJudger from 'hooks/use-judger';
import { initialRemain } from 'data/types';
import canonicalizePref from 'utils/canonicalizepref';
import UserRemain from 'components/atoms/userremain';
import InputSuggest from 'components/molecules/inputsuggest';
import InputErrorMessage from 'components/molecules/inputerrormessage';
import useErrorMessage from 'hooks/use-inputerrormessage';

const AnswerInput: FC<{
  setHome: () => void;
}> = ({ setHome }) => {
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  const [answerInputValue, setAnswerInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const [errorMessage, setErrorMessage] = useErrorMessage();

  const judge = useJudger();

  const [remain, setRemain] = useState(initialRemain);
  const [[canonicalized, suggest], setCanonicalized] = useState<
    [string | false, string]
  >([false, '']);

  const answerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canonicalized && canonicalized !== '') {
      if (remain <= 0) {
        setErrorMessage('残機がありません');
      } else {
        setRemain((state) => state - 1);
        if (!judge(canonicalized)) setErrorMessage(`残り${remain - 1}回`);
        setAnswerInputValue('');
        setCanonicalized([false, suggest]);
      }
    } else {
      setErrorMessage('都道府県を入力してください');
    }
  };

  const answerInputContainer = css`
    grid-area: answerinput;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    ${errorMessage !== '' && 'animation: 0.4s ease 0s 1 normal blink;'}
  `;
  const inputStyle = css`
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
  `;

  return (
    <div className="answerinput" css={answerInputContainer}>
      {isDuringGame ? (
        <form onSubmit={(e) => answerSubmit(e)}>
          {!!errorMessage && <InputErrorMessage errorMessage={errorMessage} />}
          <InputSuggest
            canonicalized={canonicalized}
            answerInputValue={answerInputValue}
            suggest={suggest}
          />
          <UserRemain remain={remain} />
          <input
            ref={inputRef}
            type="text"
            className="bordercomp"
            css={inputStyle}
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
            className="bordercomp"
          >
            ツイート
            <FaTwitter css={css`margin-left: 3px;`} />
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
