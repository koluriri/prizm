/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { UserSummaryObj } from 'data/types';
import { FC, useState } from 'react';

const UserSummary: FC<{ summary: UserSummaryObj }> = ({ summary }) => {
  const summaryStyle = css`
    display: grid;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
  `;
  const bignumStyle = css`
    font-size: 40px;
    margin: 2px 0px;
    white-space: nowrap;
  `;
  const unitStyle = css`
    font-size: 18px;
  `;

  const colors = ['orange', 'lightbeige', 'palepink', 'pink', 'tea', 'teal'];
  const [bgColor] = useState(colors[Math.floor(Math.random() * colors.length)]);

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
      <div css={summaryStyle}>
        <span css={bignumStyle}>{summary.playCount}</span>プレイ
      </div>
      <div css={summaryStyle}>
        <span css={bignumStyle}>{summary.currentStreak}</span>連勝中
      </div>
      <div css={summaryStyle}>
        <span css={bignumStyle}>{summary.maxStreak}</span>最多連勝
      </div>
      <div css={summaryStyle}>
        <span css={bignumStyle}>
          {summary.wonCount === 0
            ? '-'
            : Math.round((summary.wonCount / summary.playCount) * 100)}
          <small css={unitStyle}>%</small>
        </span>
        勝率
      </div>
      <div css={summaryStyle}>
        <span css={bignumStyle}>
          {summary.averageSpeed === 0 ? '-' : summary.averageSpeed}
          <small css={unitStyle}>秒</small>
        </span>
        回答速度平均
      </div>
      <div css={summaryStyle}>
        <span css={bignumStyle}>
          {summary.fastestSpeed === 0 ? '-' : summary.fastestSpeed}
          <small css={unitStyle}>秒</small>
        </span>
        最速回答
      </div>
    </div>
  );
};

export default UserSummary;
