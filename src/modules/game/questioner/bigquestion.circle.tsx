/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

const BigQuestionCircle: FC<{
  size: number;
}> = ({ size }) => {
  const gameColor = useSelector(
    (state: RootState) => state.game.entity?.color ?? 'var(--bg-color)',
  );
  const currentQuesIndex = useSelector(
    (state: RootState) => state.game.currentQuesIndex,
  );

  const circleBg = currentQuesIndex > 3 ? 'var(--red)' : gameColor;
  const circleEngaged = currentQuesIndex > 3 ? 'var(--black)' : 'var(--red)';

  const animation = useMemo(
    () => css`
      animation: 1.5s linear 0s 1 normal ${keyframes`
    0% {
      font-size: ${currentQuesIndex};
      background-image: conic-gradient(${circleEngaged} 0deg, ${circleBg} 0deg);
    }
    5% {
      background-image: conic-gradient(${circleEngaged} 18deg, ${circleBg} 18deg);
    }
    10% {
      background-image: conic-gradient(${circleEngaged} 36deg, ${circleBg} 36deg);
    }
    15% {
      background-image: conic-gradient(${circleEngaged} 54deg, ${circleBg} 54deg);
    }
    20% {
      background-image: conic-gradient(${circleEngaged} 72deg, ${circleBg} 72deg);
    }
    25% {
      background-image: conic-gradient(${circleEngaged} 90deg, ${circleBg} 90deg);
    }
    30% {
      background-image: conic-gradient(${circleEngaged} 108deg, ${circleBg} 108deg);
    }
    35% {
      background-image: conic-gradient(${circleEngaged} 126deg, ${circleBg} 126deg);
    }
    40% {
      background-image: conic-gradient(${circleEngaged} 144deg, ${circleBg} 144deg);
    }
    45% {
      background-image: conic-gradient(${circleEngaged} 162deg, ${circleBg} 162deg);
    }
    50% {
      background-image: conic-gradient(${circleEngaged} 180deg, ${circleBg} 180deg);
    }
    55% {
      background-image: conic-gradient(${circleEngaged} 198deg, ${circleBg} 198deg);
    }
    60% {
      background-image: conic-gradient(${circleEngaged} 216deg, ${circleBg} 216deg);
    }
    65% {
      background-image: conic-gradient(${circleEngaged} 234deg, ${circleBg} 234deg);
    }
    70% {
      background-image: conic-gradient(${circleEngaged} 252deg, ${circleBg} 252deg);
    }
    75% {
      background-image: conic-gradient(${circleEngaged} 270deg, ${circleBg} 270deg);
    }
    80% {
      background-image: conic-gradient(${circleEngaged} 288deg, ${circleBg} 288deg);
    }
    85% {
      background-image: conic-gradient(${circleEngaged} 306deg, ${circleBg} 306deg);
    }
    90% {
      background-image: conic-gradient(${circleEngaged} 324deg, ${circleBg} 324deg);
    }
    95% {
      background-image: conic-gradient(${circleEngaged} 342deg, ${circleBg} 342deg);
    }
    100% {
      background-image: conic-gradient(${circleEngaged} 360deg, ${circleBg} 360deg);
    }
  `};
    `,
    [circleEngaged, circleBg, currentQuesIndex],
  );

  return (
    <>
      <span
        css={css`
          position: absolute;
          content: '';
          display: block;
          top: 0;
          left: 0;
          width: ${size}px;
          height: ${size}px;
          border-radius: 100%;
          transform: scale(1.05);
          ${animation}
        `}
      />
      <span
        css={css`
          position: absolute;
          content: '';
          display: block;
          top: 0;
          left: 0;
          width: ${size}px;
          height: ${size}px;
          border-radius: 100%;
          background: var(--red);
        `}
        className="bigquestioncircle-red"
      />
    </>
  );
};

export default BigQuestionCircle;
