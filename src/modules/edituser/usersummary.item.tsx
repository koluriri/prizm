/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const UserSummaryItem: FC<{
  dispNum: number | string;
  text: string;
  // eslint-disable-next-line react/require-default-props
  unit?: string;
}> = ({ dispNum, text, unit }) => {
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

  return (
    <div css={summaryStyle}>
      <span css={bignumStyle}>
        {dispNum}
        {!!unit && <small css={unitStyle}>{unit}</small>}
      </span>
      {text}
    </div>
  );
};

export default UserSummaryItem;
