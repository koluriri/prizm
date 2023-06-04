/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { useGenerateColor } from 'hooks/use-generates';
import useCensorship from './use-censorship';

const QuestionList: FC<{
  questions: string[];
  current: number;
}> = ({ questions, current }) => {
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );
  const generateColor = useGenerateColor();

  const listItem = isDuringGame
    ? css`
        margin-right: 3px;
        margin-bottom: 3px;
        font-size: 15px;
        letter-spacing: -1px;
        transition: 0.4s ease;
        line-height: 1;
        height: 1em;
        animation: 0.4s ease 0s 1 normal dynamicclicked;
      `
    : css`
        padding: 1px 5px;
        border-radius: 15px;
        margin-right: 3px;
        margin-bottom: 5px;
        font-size: 13px;
        letter-spacing: -1px;
        animation: 0.4s ease 0s 1 both dynamicclicked;
      `;
  const listHiddenItem = css`
    width: 2px;
    height: 1em;
    background: var(--red);
    opacity: 0.7;
    display: block;
    line-height: 1;
  `;

  const censorship = useCensorship();

  return (
    <>
      {questions
        .map((question, index) =>
          index < current || !isDuringGame ? (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={`${question}.${index}`}
              css={listItem}
              style={
                !isDuringGame
                  ? {
                      background: `${generateColor()}37`,
                      animationDelay: `${index / 12}s`,
                    }
                  : {}
              }
            >
              {isDuringGame
                ? censorship(question, false)
                : censorship(question, true)}
            </span>
          ) : (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={`${question}.${index}`}
              css={listHiddenItem}
            />
          ),
        )
        .filter((q, index) => index > 2)}
    </>
  );
};

export default QuestionList;
