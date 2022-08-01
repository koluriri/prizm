/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const BigQuestion: FC<{
  displayQuestion: string;
}> = ({ displayQuestion }) => {
  const fontSize = (width: number, text: string, letterSpacing = 1): string => {
    const wrapper = width / window.innerWidth;
    const textLength = text.length > 2 ? text.length : 2;
    const fontSizeVw = (wrapper / (textLength * letterSpacing)) * 100;

    return `${fontSizeVw.toString()}vw`;
  };

  return (
    <div
      css={css({
        width: '200px',
        height: '200px',
        fontSize: fontSize(200, displayQuestion),
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#eee',
        borderRadius: '200px',
        whiteSpace: 'nowrap',
        wordBreak: 'keep-all',
      })}
    >
      {displayQuestion}
    </div>
  );
};

export default BigQuestion;
