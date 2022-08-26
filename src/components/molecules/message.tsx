/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { MessageObject } from 'data/types';

const Message: FC<{
  message: MessageObject;
}> = ({ message }) => {
  let name: string | null = null;

  if (message.type === 'answer') {
    name = message.name;
  }

  return (
    <div
      className="message"
      data-type={message.type}
      css={css`
        display: flex;
        justify-content: center;
        align-items: end;
        flex-direction: column;
        margin: 8px 0;
      `}
    >
      {name && (
        <span
          css={css`
            font-size: 14px;
            font-weight: 700;
            margin-right: 23px;
          `}
        >
          {name}
        </span>
      )}
      <div
        className="bordercomp"
        css={css`
          font-size: 18px;
          max-width: 130px;
          text-align: right;
        `}
        data-matched={message.type === 'answer' && message.matched}
        key={message.key}
      >
        {message.value.split(/(\n)/g).map((t) => (t === '\n' ? <br /> : t))}
      </div>
    </div>
  );
};

export default Message;
