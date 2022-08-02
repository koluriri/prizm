/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { MessageObject } from 'data/types';

const Message: FC<{
  message: MessageObject;
}> = ({ message }) => {
  const answerStyle = css({
    padding: '8px 10px',
    width: 'fit-content',
    border: '1px solid #bbb',
    borderRadius: '8px',
    margin: '0 0 10px',
  });
  let matchStyle;
  let name: string | null = null;

  if (message.type === 'answer') {
    matchStyle = message.matched
      ? css({
          background: '#9fff9f',
        })
      : css({
          background: '#ffd9d9',
        });
    name = message.name;
  }

  return (
    <div css={[answerStyle, matchStyle]} key={message.key}>
      {name !== null && (
        <>
          <b css={{ fontSize: '0.7em' }}>{name}</b>
          <br />
        </>
      )}
      {message.value}
    </div>
  );
};

export default Message;
