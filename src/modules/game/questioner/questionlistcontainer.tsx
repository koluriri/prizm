/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import QuestionList from 'modules/game/questioner/questionlist';

const QuestionListContainer: FC<{
  questions: string[];
  // eslint-disable-next-line react/require-default-props
  current?: number;
}> = ({ questions, current = 0 }) => {
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  const listDom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (listDom.current)
      listDom.current.scrollBy({
        top: listDom.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [current]);

  return (
    <div
      ref={listDom}
      css={css`
        max-width: 348px;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.4;
        margin-top: 20px;
        overflow-x: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        ${isDuringGame
          ? css`
              height: 36px;
            `
          : css`
              max-height: 186px;
            `}

        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <QuestionList questions={questions} current={current} />
      {/* isDuringGame && (
        <span
          css={css`
            line-height: 1.2;
            font-size: 0.8em;
          `}
        >
          ({30 - current})
        </span>
      ) */}
    </div>
  );
};

export default QuestionListContainer;
