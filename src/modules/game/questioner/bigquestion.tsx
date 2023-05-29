/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Ztext from 'react-ztext';

import useFitFontSizeToWidth from 'modules/game/questioner/use-fitfontsizetowidth';

import BigQuestionCircle from 'modules/game/questioner/bigquestion.circle';
import { Mode } from 'utils/types';

const BigQuestion: FC<{
  displayQuestion: string;
  mode: Mode;
}> = ({ displayQuestion = 'Unknown', mode }) => {
  const fontSize = useFitFontSizeToWidth();

  const [size, setSize] = useState(118);
  useEffect(() => {
    if (window.innerWidth > 320) setSize(140);
    if (window.innerWidth > 767) setSize(200);
  }, []);

  const spanDom = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (spanDom.current) {
      const nodeList = spanDom.current.querySelectorAll('div > span > span');
      Object.keys(nodeList).forEach((key) => {
        nodeList[Number(key)].innerHTML = displayQuestion;
      });

      const nodeList2 = spanDom.current.querySelectorAll('div > span');
      Object.keys(nodeList2).forEach((key) => {
        nodeList2[Number(key)].classList.remove('bigquestion-animation');
        setTimeout(() => {
          nodeList2[Number(key)].classList.add('bigquestion-animation');
        }, 30);
      });
    }
  }, [displayQuestion]);

  const bigQuestionContainer = css`
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
  `;

  const hiderPositions = ['left', 'top', 'bottom', 'right'];
  const hiderPos = useMemo(
    () => hiderPositions[Math.floor(Math.random() * hiderPositions.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayQuestion],
  );

  const hider =
    mode === 'veryveryveryhell' && !['1', '2', '3'].includes(displayQuestion)
      ? css`
          & div > span {
            position: relative;
          }
          & div > span:before {
            content: '';
            display: block;
            background: var(--red);
            inset: 0;
            ${hiderPos}: 33%;
            position: absolute;
            z-index: 4800;
            transform: translateZ(6px);
          }
        `
      : css``;

  const layersStyle = css`
    ${hider}
    /*& div > span {
      animation: 1.5s linear 0s infinite normal rotate-horizontal;
    }*/

    & div > span > span:not(:first-of-type) {
      color: var(--primary-color);
    }
  `;

  return (
    <div css={bigQuestionContainer}>
      <BigQuestionCircle size={size} />
      <span className="bigquestion-layers" css={layersStyle} ref={spanDom}>
        <Ztext
          depth={mode === 'veryveryveryhell' ? '10px' : '100px'}
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
