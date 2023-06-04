/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, ReactNode } from 'react';

const MessageNotice: FC<{
  animationDelay: number;
  background: string;
  children: ReactNode;
}> = ({ animationDelay, background, children }) => (
  <span
    className="message-notice"
    css={css`
      animation-delay: ${animationDelay}s;
      background-color: var(--${background});
      color: var(--black);
    `}
  >
    {children}
  </span>
);

export default MessageNotice;
