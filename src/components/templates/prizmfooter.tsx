/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import { ReactComponent as Logo } from 'assets/svg/logo-horizontal.svg';

const PrizmFooter: FC<{ privacyMode: () => void }> = ({ privacyMode }) => (
  <footer
    css={css`
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex-direction: row;
      line-height: 1;
      gap: 8px;

      @media (min-height: 680px) {
        margin-top: -50px;
      }
    `}
  >
    <Logo
      css={css`
        height: 18px;
      `}
    />
    <p
      css={css`
        font-size: 12px;
      `}
    >
      © 2022{' '}
      <a
        href="//twitter.com/koluriri"
        target="_blank"
        rel="noreferrer"
        css={css`
          text-decoration: underline;
        `}
      >
        koluriri
      </a>
      .
    </p>
    <button
      type="button"
      className="button-link"
      onClick={() => privacyMode()}
      css={css`
        font-size: 12px;
        letter-spacing: -1px;
      `}
    >
      プライバシーポリシー
    </button>
  </footer>
);

export default PrizmFooter;
