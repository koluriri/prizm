/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import { MessageObject } from 'data/types';
import MessageContent from 'components/molecules/messagecontent';

const Message: FC<{
  message: MessageObject;
}> = ({ message }) => {
  const isDisabled =
    (message.type === 'answer' && !message.matched) ||
    (message.type !== 'answer' &&
      message.type !== 'score' &&
      message.type !== 'end');

  const messageContainer = css`
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: column;
    margin: 8px 0;
    transition: 0.2s, visibility 0s;
    ${message.type === 'answer' && message.matched
      ? 'transform-origin: center right;animation: 0.3s ease 0s 1 normal message-added-matched;'
      : 'transform-origin: bottom right;animation: 0.2s ease 0s 1 normal message-added;'}
  `;
  const messageName = css`
    font-size: 13px;
    font-weight: 700;
    margin-right: 23px;
  `;

  return (
    <div
      className="message"
      data-disabled={isDisabled}
      data-type={message.type}
      data-matched={message.type === 'answer' && message.matched}
      css={messageContainer}
    >
      {message.type === 'answer' && (
        <span css={messageName}>{message.name}</span>
      )}
      <MessageContent message={message}>
        {message.value
          .split(/(\n)/g)
          // eslint-disable-next-line react/no-array-index-key
          .map((t, index) => (t === '\n' ? <br key={`${t}.${index}`} /> : t))}
      </MessageContent>
    </div>
  );
};

export default Message;
