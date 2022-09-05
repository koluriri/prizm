/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { FC } from 'react';
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
  const circleEngaged =
    currentQuesIndex > 3 ? 'var(--primary-color)' : 'var(--red)';

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
          animation: 1.5s linear 0s infinite normal ${keyframes`
        0% {
          background-image: conic-gradient(${circleEngaged} 0deg, ${circleBg} 0deg);
        }
        12.5% {
          background-image: conic-gradient(${circleEngaged} 45deg, ${circleBg} 45deg);
        }
        25% {
          background-image: conic-gradient(${circleEngaged} 90deg, ${circleBg} 90deg);
        }
        37.5% {
          background-image: conic-gradient(${circleEngaged} 135deg, ${circleBg} 135deg);
        }
        50% {
          background-image: conic-gradient(${circleEngaged} 180deg, ${circleBg} 180deg);
        }
        62.5% {
          background-image: conic-gradient(${circleEngaged} 225deg, ${circleBg} 225deg);
        }
        75% {
          background-image: conic-gradient(${circleEngaged} 270deg, ${circleBg} 270deg);
        }
        87.5% {
          background-image: conic-gradient(${circleEngaged} 315deg, ${circleBg} 315deg);
        }
        100% {
          background-image: conic-gradient(${circleEngaged} 360deg, ${circleBg} 360deg);
        }
      `};
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
