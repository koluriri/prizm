/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

const QuestionList: FC<{
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

  let spanStyle = css`
    margin-right: 3px;
    margin-bottom: 3px;
    font-size: 15px;
    letter-spacing: -1px;
    transition: 0.4s ease;
    line-height: 1;
    height: 1em;
  `;

  let duringStyle = css``;

  if (!isDuringGame) {
    spanStyle = css`
      background: rgba(0, 0, 0, 0.05);
      padding: 1px 5px;
      border-radius: 15px;
      margin-right: 3px;
      margin-bottom: 5px;
      font-size: 13px;
      letter-spacing: -1px;
    `;
  } else {
    duringStyle = css`
      height: 47px;
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    `;
  }

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
        ${duringStyle}
      `}
    >
      {questions.map((question, index) =>
        index < current || !isDuringGame ? (
          <span css={spanStyle}>{question} </span>
        ) : (
          <span
            css={css`
              width: 2px;
              height: 1em;
              background: var(--primary-color);
              opacity: 0.3;
              display: block;
              line-height: 1;
            `}
          />
        ),
      )}
    </div>
  );
};

export default QuestionList;
