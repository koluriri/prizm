/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const InputErrorMessage: FC<{
  errorMessage: string;
}> = ({ errorMessage }) => (
  <p
    css={css`
      pointer-events: none;
      position: absolute;
      top: -24px;
      right: 10px;
      width: fit-content;
      background: var(--red);
      color: var(--bg-color);
      border-radius: 20px;
      line-height: 1;
      padding: 4px 8px;
      margin: 0;
      text-align: right;
    `}
  >
    {errorMessage}
  </p>
);

export default InputErrorMessage;
