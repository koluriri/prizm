/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { FC, useRef } from 'react';

import Ztext from 'react-ztext';

const BigQuestion: FC<{
  // eslint-disable-next-line react/require-default-props
  displayQuestion: string;
}> = ({ displayQuestion = 'Unknown' }) => {
  const fontSize = (width: number, text: string, letterSpacing = 1): string => {
    const wrapper = width / window.innerWidth;
    const textLength = text.length > 2 ? text.length : 2;
    const fontSizeVw = (wrapper / (textLength * letterSpacing)) * 100;

    return `${fontSizeVw.toString()}vw`;
  };

  let size = 118;
  if (window.innerWidth > 320) size = 140;
  if (window.innerWidth > 767) size = 200;

  const spanDom = useRef<HTMLSpanElement>(null);
  if (spanDom.current) {
    const nodeList = spanDom.current.querySelectorAll('div > span > span');
    Object.keys(nodeList).forEach((key) => {
      nodeList[Number(key)].innerHTML = displayQuestion;
    });
  }

  return (
    <div
      css={css`
        width: ${size}px;
        height: ${size}px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        word-break: keep-all;
        font-weight: 900;
        color: var(--bg-color);
        margin-top: 17px;
        position: relative;
      `}
    >
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
      />
      <span
        className="bigquestion-spans"
        ref={spanDom}
        css={css`
          position: relative;
        `}
      >
        <Ztext
          depth="100px"
          direction="both"
          event="none"
          eventRotation="30deg"
          eventDirection="default"
          fade={false}
          perspective="400px"
          layers={10}
          style={{
            fontSize: fontSize(size, displayQuestion),
          }}
        >
          {displayQuestion}
        </Ztext>
      </span>
    </div>
  );
};

export default BigQuestion;
