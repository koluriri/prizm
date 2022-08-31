/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Messages } from 'data/types';
import { FC } from 'react';

const MatchedText: FC<{
  messages: Messages;
}> = ({ messages }) => {
  const matchedName = messages.find(
    (msg) => msg.type === 'answer' && msg.matched,
  );

  return (
    <div className="matchedtext">
      <span
        css={css`
          font-size: 0.7em;
          letter-spacing: 0;
        `}
      >
        {matchedName?.type === 'answer' && matchedName.name}
      </span>
      <br />
      あたり！
    </div>
  );
};

export default MatchedText;
