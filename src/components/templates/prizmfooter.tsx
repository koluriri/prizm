/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const PrizmFooter: FC = () => (
  <footer
    css={css`
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      @media (min-height: 680px) {
        margin-top: -50px;
      }
    `}
  >
    prizm
  </footer>
);

export default PrizmFooter;
