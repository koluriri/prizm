/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { prefectureABC } from 'data/prefecture';
import { PrefectureStr } from 'data/types';
import { FC } from 'react';

import Pref3D from 'components/molecules/pref3d';

const AnswerDisplay: FC<{
  answer: PrefectureStr;
  color: string;
}> = ({ answer, color }) => {
  const answerDisp = css`
    font-size: 38px;
    text-align: center;
    letter-spacing: -1px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 10px;

    @media (max-width: 374px) {
      font-size: 28px;
    }

    @media (min-width: 768px) {
      letter-spacing: 1px;
    }
  `;
  const answerEngDisp = css`
    display: block;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 4px;
    margin-top: 5px;
    color: ${color};
  `;

  return (
    <>
      <h3 css={answerDisp}>
        {answer}
        <span css={answerEngDisp}>{prefectureABC[answer]}</span>
      </h3>
      <Pref3D name={answer} />
    </>
  );
};

export default AnswerDisplay;
