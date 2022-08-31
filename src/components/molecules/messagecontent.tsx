/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { MessageObject } from 'utils/types';
import { FC, ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { FaTimes } from 'react-icons/fa';
import MessageScores from 'components/molecules/messagescores';

const MessageContent: FC<{
  message: MessageObject;
  children: ReactNode;
}> = ({ message, children }) => {
  const gameColor = useSelector(
    (state: RootState) => state.game.entity?.color ?? 'var(--bg-color)',
  );

  const messageContent = css`
    ${message.type === 'answer' &&
    !message.matched &&
    'animation: 0.4s ease 0s 1 normal redblink;'}
  `;
  const hintHeading = css`
    color: ${gameColor};
  `;
  const matchIconStyle = css`
    margin-right: 4px;
  `;

  return (
    <div className="bordercomp" key={message.key} css={messageContent}>
      {message.type === 'hint' && (
        <span css={hintHeading}>
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

      {children}

      {message.type === 'score' && message.notice && (
        <MessageScores notice={message.notice} />
      )}
    </div>
  );
};

export default MessageContent;
