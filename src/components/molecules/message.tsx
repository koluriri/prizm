/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { MessageObject } from 'data/types';

import { FaTimes } from 'react-icons/fa';

const Message: FC<{
  message: MessageObject;
}> = ({ message }) => {
  const gameColor = useSelector(
    (state: RootState) => state.game.entity?.color ?? 'var(--bg-color)',
  );

  let name: string | null = null;

  const matchIconStyle = css`
    margin-right: 4px;
  `;

  if (message.type === 'answer') {
    name = message.name;
  }

  return (
    <div
      className="message"
      data-disabled={
        (message.type === 'answer' && !message.matched) ||
        (message.type !== 'answer' &&
          message.type !== 'score' &&
          message.type !== 'end')
      }
      data-type={message.type}
      data-matched={message.type === 'answer' && message.matched}
      css={css`
        display: flex;
        justify-content: center;
        align-items: end;
        flex-direction: column;
        margin: 8px 0;
        transition: 0.2s, visibility 0s;
        ${message.type === 'answer' && message.matched
          ? 'transform-origin: center right;animation: 0.3s ease 0s 1 normal message-added-matched;'
          : 'transform-origin: bottom right;animation: 0.2s ease 0s 1 normal message-added;'}
      `}
    >
      {name && (
        <span
          css={css`
            font-size: 13px;
            font-weight: 700;
            margin-right: 23px;
          `}
        >
          {name}
        </span>
      )}
      <div className="bordercomp" key={message.key}>
        {message.type === 'hint' && (
          <span
            css={css`
              color: ${gameColor};
            `}
          >
            ヒント
            <br />
          </span>
        )}
        {message.type === 'answer' &&
          (message.matched ? (
            <span className="icon-circle" css={matchIconStyle} />
          ) : (
            <FaTimes css={matchIconStyle} />
          ))}
        {message.value.split(/(\n)/g).map((t) => (t === '\n' ? <br /> : t))}
      </div>
    </div>
  );
};

export default Message;
