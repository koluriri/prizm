/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { MessageObject } from 'data/types';

const Message: FC<{
  message: MessageObject;
}> = ({ message }) => {
  if (message.type === 'answer') {
    const answerStyle = css({
      padding: '8px 10px',
      width: 'fit-content',
      border: '1px solid #bbb',
      borderRadius: '8px',
      margin: '0 0 10px',
    });
    const matchStyle = message.matched
      ? css({
          background: '#9fff9f',
        })
      : css({
          background: '#ffd9d9',
        });

    return (
      <div
        css={[answerStyle, matchStyle]}
        data-match={message.matched}
        key={message.key}
      >
        <b css={{ fontSize: '0.7em' }}>{message.name}</b>
        <br />
        {message.value}
      </div>
    );
  }

  return <p>予期しないメッセージ</p>;
};

export default Message;
