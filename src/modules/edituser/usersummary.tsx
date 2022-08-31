/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { UserSummaryObj } from 'utils/types';
import { FC, useState } from 'react';
import UserSummaryItem from 'modules/edituser/usersummaryitem';

const UserSummary: FC<{ summary: UserSummaryObj }> = ({ summary }) => {
  const colors = ['orange', 'lightbeige', 'palepink', 'pink', 'tea', 'teal'];
  const [bgColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const userSummaryContainer = css`
    animation: 0.4s ease 0.2s 1 normal clicked;
    margin: 0 auto 80px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(33%, 1fr));
    gap: 20px 0;
    padding-top: 25px;
    padding-bottom: 25px;
    border: 0;
    background-color: var(--${bgColor});
  `;

  return (
    <div className="prizm-card" css={userSummaryContainer}>
      <UserSummaryItem dispNum={summary.playCount} text="プレイ" />
      <UserSummaryItem dispNum={summary.currentStreak} text="連勝中" />
      <UserSummaryItem dispNum={summary.maxStreak} text="最多連勝" />
      <UserSummaryItem
        dispNum={
          summary.wonCount === 0
            ? '-'
            : Math.round((summary.wonCount / summary.playCount) * 100)
        }
        unit="%"
        text="勝率"
      />
      <UserSummaryItem
        dispNum={summary.averageSpeed === 0 ? '-' : summary.averageSpeed}
        unit="秒"
        text="回答速度平均"
      />
      <UserSummaryItem
        dispNum={summary.fastestSpeed === 0 ? '-' : summary.fastestSpeed}
        unit="秒"
        text="最速回答"
      />
    </div>
  );
};

export default UserSummary;
