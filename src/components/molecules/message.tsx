/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { MessageObject } from 'data/types';

const Message: FC<{
  message: MessageObject;
}> = ({ message }) => {
  const gameColor = useSelector(
    (state: RootState) => state.game.entity?.color ?? 'var(--bg-color)',
  );

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
        data-matched={message.type === 'answer' && message.matched}
        key={message.key}
      >
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
        {message.value.split(/(\n)/g).map((t) => (t === '\n' ? <br /> : t))}
      </div>
    </div>
  );
};

export default Message;
