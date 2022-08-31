/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useFitFontSizeToWidth from 'hooks/use-fitfontsizetowidth';
import { FC, useEffect, useRef, useState } from 'react';
import Ztext from 'react-ztext';

import BigQuestionCircle from 'modules/game/questioner/bigquestion.circle';

const BigQuestion: FC<{
  displayQuestion: string;
}> = ({ displayQuestion = 'Unknown' }) => {
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

  return (
    <div css={bigQuestionContainer}>
      <BigQuestionCircle size={size} />
      <span className="bigquestion-layers" ref={spanDom}>
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
