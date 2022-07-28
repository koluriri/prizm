/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const BigQuestion: FC<{
  displayText: string;
}> = ({ displayText }) => (
  <div
    css={css`
      font-size: 180px;
    `}
  >
    {displayText}
  </div>
);

export default BigQuestion;
