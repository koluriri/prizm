/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import logo from 'assets/logo-vertical.svg';

const HomeLogo: FC = () => {
  const homeLogoContainer = css`
    grid-area: logo;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: end;
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
        <img src={logo} alt="prizm" />
      </h1>
      <h2 css={homeLogoCopy}>
        市町村から
        <br />
        都道府県を当てるだけ！
      </h2>
    </div>
  );
};

export default HomeLogo;
