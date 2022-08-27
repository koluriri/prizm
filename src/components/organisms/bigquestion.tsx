/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

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

  const size = window.innerWidth < 768 ? 140 : 200;

  return (
    <div
      css={css`
        width: ${size}px;
        height: ${size}px;
        font-size: ${fontSize(size, displayQuestion)};
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: var(--red);
        border-radius: 200px;
        white-space: nowrap;
        word-break: keep-all;
        font-weight: 900;
        color: var(--bg-color);
        margin-top: 17px;
      `}
    >
      {displayQuestion}
    </div>
  );
};

export default BigQuestion;
