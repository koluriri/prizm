/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { TbInfoCircle } from 'react-icons/tb';

const HomeLogo: FC = () => {
  const homeLogoContainer = css`
    grid-area: logo;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: end;
    padding: 30px 0;
  `;
  const homeLogo = css`
    width: 90px;
    margin: 0;

    @media (min-width: 768px) {
      width: 120px;
    }
  `;
  const homeLogoCopy = css`
    font-size: 17px;
    font-weight: 900;
    line-height: 1;
    margin: 8px 0 15px;
    text-align: center;
    line-height: 1.35;
  `;

  return (
    <div css={homeLogoContainer}>
      <h1 css={homeLogo}>
        <svg
          id="Layer_2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 283 261.8"
        >
          <circle cx="119" cy="108" r="18" style={{ fill: '#d94550' }} />
          <path
            d="M84.3 81h42.4c5.7 0 10.3-5 10.3-11.3V11.3c0-10.7-12.2-15.4-18.3-7L76.3 62.6c-5.4 7.4-.6 18.4 8 18.4Z"
            style={{ fill: '#53822b' }}
          />
          <path
            d="M157.7 36h39.7c6.4 0 11.6 5.9 11.6 13.1v63.7c0 12.9-14.6 18-21.1 7.6l-39.7-63.7c-5.5-8.7 0-20.7 9.5-20.7Z"
            style={{ fill: '#395298' }}
          />
          <path
            style={{ fill: 'currentColor' }}
            d="M25.6 182a20 20 0 0 1 9.7-2.2c4.4 0 8.3 1.2 11.9 3.5 3.5 2.3 6.4 5.5 8.4 9.8 2 4.2 3.1 9.2 3.1 14.9s-1 10.6-3 15c-2.1 4.2-5 7.5-8.5 9.8a21.5 21.5 0 0 1-12 3.4c-3.6 0-6.9-.7-9.6-2.2a17.1 17.1 0 0 1-6.4-6.1v29.9a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-73.3a4 4 0 0 1 4-4h11.2a4 4 0 0 1 4 4v3.7c1.5-2.6 3.6-4.6 6.4-6.1Zm10.7 17.6c-2-2-4.3-3-7-3s-5.3 1-7.2 3c-2 2-2.9 4.8-2.9 8.4s1 6.4 2.9 8.4c2 2 4.3 3 7.1 3s5.2-1 7.1-3c2-2.1 2.9-5 2.9-8.4s-1-6.4-2.9-8.4ZM92.8 182.8c1.6-1 3.2-1.6 4.8-2.1a4 4 0 0 1 5.1 3.9v12a4 4 0 0 1-4 4h-1.4c-4.2 0-7.3.7-9.3 2.4-2 1.6-3 4.4-3 8.5v20a4 4 0 0 1-4 4H69.7a4 4 0 0 1-4-4v-47a4 4 0 0 1 4-4H81a4 4 0 0 1 4 4v5.7a25 25 0 0 1 7.8-7.4ZM128.8 184.5v47a4 4 0 0 1-4 4h-11.2a4 4 0 0 1-4-4v-47a4 4 0 0 1 4-4h11.2a4 4 0 0 1 4 4Zm-4-9.5h-11.2a4 4 0 0 1-4-4v-11.2a4 4 0 0 1 4-4h11.2a4 4 0 0 1 4 4V171a4 4 0 0 1-4 4ZM158 219.5h19.4a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-36.6a4 4 0 0 1-4-4v-9.6c0-1 .4-2 1-2.7l20.8-22.7H141a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4h35.6a4 4 0 0 1 4 4v9.6c0 1-.4 2-1.1 2.8L158 219.5ZM277 186.3c4 4.2 6 9.9 6 17.1v28.1a4 4 0 0 1-4 4h-11.2a4 4 0 0 1-4-4V206c0-3-.8-5.2-2.4-6.9-1.7-1.6-3.9-2.4-6.7-2.4s-5 .8-6.7 2.4-2.4 4-2.4 6.9v25.5a4 4 0 0 1-4 4h-11.2a4 4 0 0 1-4-4V206c0-3-.8-5.2-2.4-6.9-1.6-1.6-3.8-2.4-6.6-2.4s-5.2.8-6.8 2.4a9.3 9.3 0 0 0-2.4 6.9v25.5a4 4 0 0 1-4 4h-11.3a4 4 0 0 1-4-4v-47a4 4 0 0 1 4-4h11.3a4 4 0 0 1 4 4v3.3c1.7-2.4 3.9-4.3 6.6-5.7 2.7-1.4 5.8-2 9.3-2 4 0 7.7.8 10.9 2.6 3.1 1.7 5.6 4.2 7.5 7.4 2-3 4.5-5.4 7.7-7.3 3.2-1.8 6.7-2.8 10.6-2.8 6.9 0 12.3 2.1 16.3 6.3Z"
          />
        </svg>
      </h1>
      <h2 css={homeLogoCopy}>
        市町村
        <span
          css={css`
            position: relative;
            display: inline-block;

            &:hover > ul {
              z-index: 5025;
              display: inline-block;
            }
          `}
        >
          <ul
            css={css`
              position: absolute;
              top: 30px;
              left: 50%;
              display: none;
              font-size: 14px;
              width: 170px;
              max-width: 90vw;
              color: var(--red);
              background: var(--red-subdued);
              padding: 12px;
              border-radius: 12px;
              text-align: left;
              transform: translateX(-50%);
              transform-origin: bottom center;
              margin: 0;
              list-style-type: none;
              padding-left: 26px;

              &::after {
                position: absolute;
                top: -10px;
                left: 50%;
                width: 0;
                height: 0;
                margin-left: -10px;
                content: '';
                border-color: var(--red-subdued);
                border-right: 10px solid transparent;
                border-bottom-style: solid;
                border-bottom-width: 10px;
                border-left: 10px solid transparent;
              }

              & li {
                position: relative;
              }

              & li::before {
                position: absolute;
                content: '';
                width: 5px;
                height: 5px;
                background: currentColor;
                border-radius: 50%;
                left: -12px;
                top: 7px;
              }
            `}
          >
            <li>特別区(東京23区)を含む</li>
            <li>市町村以外のモードも数多く用意しています</li>
          </ul>
          <TbInfoCircle
            css={css`
              color: var(--primary-color-subdued);
            `}
          />
        </span>
        から
        <br />
        <u
          css={css`
            text-decoration: underline;
            text-underline-offset: 4px;
            text-decoration-thickness: 2px;
            text-decoration-style: dashed;
          `}
        >
          都道府県を当てる
        </u>
        だけ！
      </h2>
    </div>
  );
};

export default HomeLogo;
