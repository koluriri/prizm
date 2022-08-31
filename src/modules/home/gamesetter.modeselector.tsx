/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Mode, modesCaption, modesDisplay } from 'utils/types';
import { FC, useEffect, useState } from 'react';

const ModeSelector: FC<{
  mode: Mode;
  setMode: (mode: Mode) => void;
}> = ({ mode, setMode }) => {
  const [modeCaption, setModeCaption] = useState('');
  useEffect(() => {
    setModeCaption(modesCaption[mode]);
  }, [mode]);

  const modeCaptionStyle = css`
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: #7a5154;
  `;

  const selectorContainer = css`
    margin: 0 auto;
    width: 340px;
    max-width: 95vw;
    max-width: calc(100vw - 60px);
    position: relative;

    &:after,
    &:before {
      content: '';
      width: 10px;
      height: 60px;
      background-image: linear-gradient(
        90deg,
        transparent 0%,
        var(--bg-color) 100%
      );
      display: block;
      position: absolute;
      right: 0;
      pointer-events: none;
      top: 0;
    }

    &:before {
      background-image: linear-gradient(
        -90deg,
        transparent 0%,
        var(--bg-color) 100%
      );
      left: 0;
    }

    @media (min-width: 768px) {
      width: auto;

      &:before,
      &:after {
        content: none;
      }
    }
  `;
  const selectorInner = css`
    display: flex;
    overflow-y: auto;
    padding-left: 10px;

    &::-webkit-scrollbar {
      display: none;
    }

    &:after {
      content: '';
      display: block;
      min-width: 80px;
    }

    @media (min-width: 768px) {
      padding-left: 0;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      overflow: visible;

      &:after {
        content: none;
      }
    }
  `;

  return (
    <>
      <div css={selectorContainer}>
        <div css={selectorInner}>
          {Object.keys(modesDisplay).map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => setMode(key as Mode)}
              className="bordercomp"
              data-active={key === mode}
            >
              {modesDisplay[key as Mode]}
            </button>
          ))}
        </div>
      </div>
      <p css={modeCaptionStyle}>{modeCaption}</p>
    </>
  );
};

export default ModeSelector;
