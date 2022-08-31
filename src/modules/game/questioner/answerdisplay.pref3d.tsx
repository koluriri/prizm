/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { PrefectureStr } from 'utils/types';
import { FC } from 'react';

import Prefsvg from 'modules/game/questioner/answerdisplay.pref3d.svg';
import Ztext from 'react-ztext';

const Pref3D: FC<{
  name: PrefectureStr;
}> = ({ name }) => (
  <div
    css={css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      & > div > span {
        animation: 8s linear 0s infinite alternate ${keyframes`
            0% {
              transform: rotateY(-50deg);
            }
            100% {
              transform: rotateY(50deg);
            }
          `};
      }

      & > div > span > span:last-of-type {
        filter: drop-shadow(3px 10px 16px rgba(50, 8, 10, 0.1));
      }

      & > div > span > span:not(:first-of-type) {
        filter: brightness(0.72);
      }

      & svg {
        max-height: 26vh;
        width: 100%;
        padding: 10px;

        & > *:not(defs) {
          animation: 1s ease 0.7s 1 both ${keyframes`
              0% {
                opacity:0;
                transform: translateY(220px);
              }
              1% {
                opacity:1;
              }
              45% {
                transform: translateY(-70px);
              }
              55% {
                transform: translateY(0);
              }
              75% {
                transform: translateY(-25px);
              }
              85% {
                transform: translateY(0);
              }
              93% {
                transform: translateY(-10px);
              }
              100% {
                transform: translateY(0);
              }
            `};

          &:nth-of-type(2n) {
            animation-delay: 0.8s;
            transform: translateZ(2000px);
          }
          &:nth-of-type(5n) {
            animation-delay: 0.9s;
          }
        }
      }
    `}
  >
    <Ztext
      depth="70px"
      direction="both"
      event="none"
      eventRotation="30deg"
      eventDirection="default"
      fade={false}
      perspective="270px"
      layers={20}
    >
      <Prefsvg name={name} />
    </Ztext>
  </div>
);

export default Pref3D;
