/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Mode, modesCaption, modesDisplay } from 'utils/types';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import useAudio from 'hooks/use-audio';

const ModeButton = ({
  targetMode,
  currentMode,
  setMode,
}: {
  targetMode: Mode;
  currentMode: Mode;
  setMode: (mode: Mode) => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (
      buttonRef.current &&
      targetMode === currentMode &&
      currentMode !== 'easy'
    ) {
      buttonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [currentMode, targetMode]);

  const playSE = useAudio();

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={() => {
        playSE('button');
        setMode(targetMode);
      }}
      className="bordercomp"
      data-active={targetMode === currentMode}
    >
      {modesDisplay[targetMode]}
    </button>
  );
};

const ModeSelector: FC<{
  mode: Mode;
  setMode: (mode: Mode) => void;
}> = ({ mode, setMode }) => {
  const modeCaption = useMemo(() => modesCaption[mode], [mode]);

  const [isCollapse, setIsCollapse] = useState<boolean>(
    Object.keys(modesDisplay).indexOf(mode) >= 3,
  );

  const moreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      if (moreRef.current) moreRef.current.scrollLeft += e.deltaY;
    };

    if (moreRef.current) moreRef.current.addEventListener('wheel', onWheel);

    return () => {
      if (moreRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        moreRef.current.removeEventListener('wheel', onWheel);
    };
  }, []);

  const modeCaptionStyle = css`
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: var(--mode-caption-color);
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
    scrollbar-width: none;
    align-items: center;

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

  const playSE = useAudio();

  return (
    <>
      <div css={selectorContainer}>
        <div css={selectorInner}>
          {Object.keys(modesDisplay).map((key, index) => {
            if (index < 4)
              return (
                <ModeButton
                  key={key}
                  targetMode={key as Mode}
                  currentMode={mode}
                  setMode={setMode}
                />
              );
            if (index === 4)
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    playSE(isCollapse ? 'uncollapse' : 'collapse');
                    if (isCollapse) setMode('easy');
                    setIsCollapse((c) => !c);
                  }}
                  className="bordercomp mode-more-button"
                  data-active={isCollapse}
                >
                  {!isCollapse ? (
                    <>
                      もっと表示 <FaCaretUp />
                    </>
                  ) : (
                    <>
                      閉じる <FaCaretDown />
                    </>
                  )}
                </button>
              );

            return true;
          })}
          <span className="mode-divider" />
          <div className="modes-more-wrapper">
            <div className="modes-more" data-open={isCollapse} ref={moreRef}>
              {Object.keys(modesDisplay).map((key, index) => {
                if (index >= 4)
                  return (
                    <ModeButton
                      key={key}
                      targetMode={key as Mode}
                      currentMode={mode}
                      setMode={setMode}
                    />
                  );

                return true;
              })}
            </div>
          </div>
        </div>
      </div>
      <p css={modeCaptionStyle}>{modeCaption}</p>
    </>
  );
};

export default ModeSelector;
