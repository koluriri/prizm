/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { modesDisplay, modesCaption, Mode } from 'utils/types';

const GameReady: FC<{
  startBy: string;
  mode: Mode;
  count: number;
}> = ({ startBy, mode, count }) => {
  const gameReadyWrapper = css`
    animation: 0.4s ease 0s 1 normal blink;
  `;
  const startHeading = css`
    text-align: center;
    margin: 0;
    color: var(--bg-color);
    font-size: 30px;
    font-weight: 900;
  `;
  const modeHeading = css`
    text-align: center;
    margin: 10px 0 22px;
    color: var(--primary-color);
    font-size: 30px;
    font-weight: 900;
  `;
  const modeCaption = css`
    font-size: 16px;
    display: block;
    margin-top: 6px;
  `;
  const usersWrapper = css`
    color: var(--primary-color);
    margin-bottom: 22px;
  `;

  return (
    <>
      <div css={gameReadyWrapper} className="gamereadywrapper">
        <h3 css={startHeading}>
          {startBy}が<br />
          ゲームを開始!
        </h3>
        <h4 css={modeHeading}>
          {modesDisplay[mode]}
          <small css={modeCaption}>{modesCaption[mode]}</small>
        </h4>
      </div>
      <div css={usersWrapper} className="gamereadywrapper">
        {count}人の参加者
      </div>
    </>
  );
};

export default GameReady;
