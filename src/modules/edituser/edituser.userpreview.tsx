/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const UserPreview: FC<{
  name: string;
  score: number;
  color: string;
}> = ({ name, score, color }) => {
  const edituserPreview = css`
    margin: 0 auto 40px;
    padding: 5px 11px;
    border-radius: 20px;
    width: fit-content;
    background-color: ${color}33;
    font-weight: 700;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const edituserPreviewIcon = css`
    width: 7px;
    height: 7px;
    background: ${color};
    border-radius: 5px;
    margin-right: 5px;
  `;
  const edituserPreviewName = css`
    max-width: 120px;
  `;
  const edituserPreviewScore = css`
    font-size: 13px;
    font-weight: 500;
    margin-left: 8px;
  `;

  return (
    <div css={edituserPreview}>
      <span css={edituserPreviewIcon} />
      <span css={edituserPreviewName}>{name.slice(0, 7)}</span>
      <span css={edituserPreviewScore}>
        スコア
        {score}
      </span>
    </div>
  );
};

export default UserPreview;
