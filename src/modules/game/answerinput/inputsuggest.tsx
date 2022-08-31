/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

const InputSuggest: FC<{
  canonicalized: string | false;
  answerInputValue: string;
  suggest: string;
}> = ({ canonicalized, answerInputValue, suggest }) => {
  const suggestContainer = css`
    position: absolute;
    pointer-events: none;
    font-weight: 500;
    font-size: 23px;
    opacity: 0.5;
    display: flex;
    align-items: center;
    padding: 0 19px;
    margin: 3px;
    line-height: 1;
    white-space: nowrap;
    height: 45px;
    vertical-align: middle;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /*width: calc(100% - 53px);*/
    overflow: hidden;
    border-radius: 23px;
    padding-right: 53px;
  `;
  const suggestValue = css`
    font-weight: 500;
    opacity: 0;
  `;
  const suggestCaption = css`
    font-size: 18px;
  `;

  return (
    <p css={suggestContainer}>
      {canonicalized && (
        <>
          <span css={suggestValue}>{answerInputValue}</span>
          {suggest.slice(answerInputValue.length)}
          <span css={suggestCaption}>(改行で送信)</span>
        </>
      )}
    </p>
  );
};

export default InputSuggest;
