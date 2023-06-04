/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Ztext from 'react-ztext';

import useFitFontSizeToWidth from 'modules/game/questioner/use-fitfontsizetowidth';

import BigQuestionCircle from 'modules/game/questioner/bigquestion.circle';
import { Mode } from 'utils/types';
import useCensorship from './use-censorship';

const BigQuestion: FC<{
  displayQuestion: string;
  mode: Mode;
}> = ({ displayQuestion = 'Unknown', mode }) => {
  const fontSize = useFitFontSizeToWidth();

  const censorship = useCensorship();
  const censoredDisplayQuestion = useMemo(
    () => censorship(displayQuestion, false),
    [displayQuestion, censorship],
  );

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
        nodeList[Number(key)].innerHTML = censoredDisplayQuestion;
      });

      const nodeList2 = spanDom.current.querySelectorAll('div > span');
      Object.keys(nodeList2).forEach((key) => {
        nodeList2[Number(key)].classList.remove('bigquestion-animation');
        setTimeout(() => {
          nodeList2[Number(key)].classList.add('bigquestion-animation');
        }, 30);
      });
    }
  }, [censoredDisplayQuestion, censorship]);

  const hiderPositions = ['left', 'top', 'bottom', 'right'];
  const hiderPos = useMemo(
    () => hiderPositions[Math.floor(Math.random() * hiderPositions.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayQuestion],
  );

  const isMosaicEnabled = useMemo(
    () =>
      mode === 'veryveryveryhell' && !['1', '2', '3'].includes(displayQuestion),
    [mode, displayQuestion],
  );

  const hider = isMosaicEnabled
    ? css`
        position: relative;
      `
    : css``;

  const mosaicWrapper = css`
    content: '';
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.025);
    inset: 15%;
    ${hiderPos}: 42%;
    opacity: 1;
    position: absolute;
    z-index: 4800;
    /* transform: translateZ(6px); */
    transition: 0.2s;
    animation: wiggle 0.8s infinite;

    @keyframes wiggle {
      0% {
        transform: translate(0px, 0px) rotateZ(0deg);
      }
      25% {
        transform: translate(4px, 4px) rotateZ(4deg);
      }
      50% {
        transform: translate(0px, 4px) rotateZ(0deg);
      }
      75% {
        transform: translate(4px, 0px) rotateZ(-4deg);
      }
      100% {
        transform: translate(0px, 0px) rotateZ(0deg);
      }
    }

    & > span {
      display: block;
      backdrop-filter: blur(60px);
      width: 33.33%;
      aspect-ratio: 1 / 1;
    }
  `;

  const bigQuestionContainer = css`
    width: ${size}px;
    height: ${size}px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    word-break: keep-all;
    font-weight: 900;
    color: var(--white);
    margin-top: 17px;
    position: relative;
    ${hider}
  `;

  const layersStyle = css`
    /*& div > span {
      animation: 1.5s linear 0s infinite normal rotate-horizontal;
    }*/

    & div > span > span:not(:first-of-type) {
      color: var(--black);
    }
  `;

  return (
    <div css={bigQuestionContainer}>
      {isMosaicEnabled && (
        <div css={mosaicWrapper}>
          {Array(16)
            .fill(null)
            .map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={index} />
            ))}
        </div>
      )}
      <BigQuestionCircle size={size} />
      <span className="bigquestion-layers" css={layersStyle} ref={spanDom}>
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
            fontSize: fontSize(size, censoredDisplayQuestion),
          }}
        >
          {censoredDisplayQuestion}
        </Ztext>
      </span>
    </div>
  );
};

export default BigQuestion;
