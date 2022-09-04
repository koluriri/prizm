/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { FC } from 'react';

const BigQuestionCircle: FC<{
  size: number;
}> = ({ size }) => (
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
          background-image: conic-gradient(var(--primary-color) 0deg, #D94550 0deg);
        }
        12.5% {
          background-image: conic-gradient(var(--primary-color) 45deg, #D94550 45deg);
        }
        25% {
          background-image: conic-gradient(var(--primary-color) 90deg, #D94550 90deg);
        }
        37.5% {
          background-image: conic-gradient(var(--primary-color) 135deg, #D94550 135deg);
        }
        50% {
          background-image: conic-gradient(var(--primary-color) 180deg, #D94550 180deg);
        }
        62.5% {
          background-image: conic-gradient(var(--primary-color) 225deg, #D94550 225deg);
        }
        75% {
          background-image: conic-gradient(var(--primary-color) 270deg, #D94550 270deg);
        }
        87.5% {
          background-image: conic-gradient(var(--primary-color) 315deg, #D94550 315deg);
        }
        100% {
          background-image: conic-gradient(var(--primary-color) 360deg, #D94550 360deg);
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

export default BigQuestionCircle;
