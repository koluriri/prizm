/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, FormEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import UserRemain from 'components/molecules/userremain';
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

  const [canonicalized, setCanonicalized] = useState<string | false>(false);

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
        setCanonicalized(false);
      }
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
          <UserRemain remain={remain} />
          <form onSubmit={(e) => answerSubmit(e)}>
            <p>{canonicalized && `${canonicalized} (Enterで送信）`}</p>
            <input
              type="text"
              css={formControl}
              value={answerInputValue}
              onChange={(e) => {
                setAnswerInputValue(e.target.value);
                setCanonicalized(canonicalizePref(e.target.value));
              }}
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
