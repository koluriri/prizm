/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

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
    <svg
      css={css`
        height: 18px;
      `}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 462.8 126"
    >
      <circle cx="45" cy="108" r="18" style={{ fill: '#d94550' }} />
      <path
        d="M10.3 81h42.4C58.4 81 63 76 63 69.7V11.3C63 .7 50.7-4 44.7 4.4L2.3 62.6C-3.1 70 1.7 81 10.3 81Z"
        style={{ fill: '#53822b' }}
      />
      <path
        d="M83.7 36h39.7c6.4 0 11.6 5.9 11.6 13.1v63.7c0 12.9-14.6 18-21.1 7.6L74 56.7C68.8 48 74.3 36 83.8 36Z"
        style={{ fill: '#395298' }}
      />
      <path
        style={{ fill: 'currentColor' }}
        d="M205.4 46.4A20 20 0 0 1 215 44c4.3 0 8.3 1.1 11.9 3.4 3.5 2.3 6.3 5.6 8.4 9.8 2 4.3 3 9.2 3 15s-1 10.6-3 14.9c-2 4.3-4.9 7.5-8.4 9.8a21.5 21.5 0 0 1-12 3.5c-3.7 0-6.9-.8-9.6-2.3a17.1 17.1 0 0 1-6.4-6V122a4 4 0 0 1-4 4h-11.2a4 4 0 0 1-4-4V48.8a4 4 0 0 1 4-4H195a4 4 0 0 1 4 4v3.6c1.5-2.5 3.6-4.5 6.4-6ZM216 63.8c-2-2-4.3-3-7.1-3s-5.2 1-7.1 3c-2 2.1-3 4.9-3 8.4s1 6.4 3 8.4 4.3 3 7 3 5.3-1 7.2-3c2-2 2.9-4.8 2.9-8.4s-1-6.4-3-8.4ZM272.6 47c1.5-.9 3.1-1.6 4.8-2a4 4 0 0 1 5 3.8v12a4 4 0 0 1-4 4h-1.3c-4.2 0-7.3.8-9.3 2.4-2 1.7-3 4.5-3 8.6v20a4 4 0 0 1-4 4h-11.3a4 4 0 0 1-4-4v-47a4 4 0 0 1 4-4h11.2a4 4 0 0 1 4 4v5.7a25 25 0 0 1 7.9-7.5ZM308.6 48.8v47a4 4 0 0 1-4 4h-11.3a4 4 0 0 1-4-4v-47a4 4 0 0 1 4-4h11.3a4 4 0 0 1 4 4Zm-4-9.5h-11.3a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4h11.3a4 4 0 0 1 4 4v11.2a4 4 0 0 1-4 4ZM337.8 83.8h19.4a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-36.6a4 4 0 0 1-4-4V86c0-1 .4-2 1-2.7l20.8-22.6h-17.6a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4h35.6a4 4 0 0 1 4 4v9.6c0 1-.4 2-1.1 2.7l-21.6 22.7ZM456.9 50.6c4 4.1 5.9 9.9 5.9 17.1v28a4 4 0 0 1-4 4h-11.2a4 4 0 0 1-4-4V70.4c0-3-.8-5.3-2.5-6.9-1.6-1.6-3.8-2.4-6.6-2.4s-5 .8-6.7 2.4-2.4 4-2.4 6.9v25.5a4 4 0 0 1-4 4h-11.2a4 4 0 0 1-4-4V70.3c0-3-.8-5.3-2.4-6.9-1.6-1.6-3.8-2.4-6.7-2.4s-5 .8-6.7 2.4a9.3 9.3 0 0 0-2.5 6.9v25.5a4 4 0 0 1-4 4h-11.2a4 4 0 0 1-4-4v-47a4 4 0 0 1 4-4H384a4 4 0 0 1 4 4V52c1.7-2.3 4-4.2 6.6-5.6 2.8-1.4 5.9-2.1 9.4-2.1 4 0 7.7.9 10.8 2.6 3.2 1.8 5.7 4.3 7.5 7.5 2-3 4.6-5.4 7.8-7.3 3.2-1.9 6.7-2.8 10.6-2.8 6.9 0 12.3 2 16.3 6.3Z"
      />
    </svg>
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
