/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const BigQuestion: FC<{
  displayQuestion: string;
}> = ({ displayQuestion }) => (
  <div
    css={css`
      font-size: 180px;
    `}
  >
    {displayQuestion}
  </div>
);

export default BigQuestion;
