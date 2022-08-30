/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const UserSummary: FC = () => {
  const summary = css`
    display: grid;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
  `;
  const bignum = css`
    font-size: 40px;
    margin: 2px 0px;
  `;
  const unit = css`
    font-size: 18px;
  `;

  const colors = ['orange', 'lightbeige', 'palepink', 'pink', 'tea', 'teal'];
  const bgColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className="prizm-card"
      css={css`
        animation: 0.4s ease 0.2s 1 normal clicked;
        margin: 0 auto 80px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(33%, 1fr));
        gap: 20px 0;
        padding-top: 25px;
        padding-bottom: 25px;
        border: 0;
        background-color: var(--${bgColor});
      `}
    >
      <div css={summary}>
        <span css={bignum}>127</span>プレイ
      </div>
      <div css={summary}>
        <span css={bignum}>4</span>連勝中
      </div>
      <div css={summary}>
        <span css={bignum}>6</span>最大連勝
      </div>
      <div css={summary}>
        <span css={bignum}>
          63<small css={unit}>%</small>
        </span>
        勝率
      </div>
      <div css={summary}>
        <span css={bignum}>
          7.2<small css={unit}>秒</small>
        </span>
        回答速度平均
      </div>
      <div css={summary}>
        <span css={bignum}>
          1.2<small css={unit}>秒</small>
        </span>
        最速回答
      </div>
    </div>
  );
};

export default UserSummary;
