/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { MessageNoticeObj } from 'data/types';
import { FC } from 'react';

const MessageScores: FC<{
  notice: MessageNoticeObj;
}> = ({ notice }) => {
  const noticeStyle = (delay: number, bg: string) => css`
    animation-delay: ${delay}s;
    background-color: var(--${bg});
  `;

  return (
    <>
      {Object.keys(notice).map((noticeType) => {
        switch (noticeType) {
          case 'a_score':
            return (
              <span key={noticeType} className="message-notice">
                スコア +{notice && notice[noticeType]}
              </span>
            );
            break;

          case 'b_update_fastest':
            return (
              <span
                key={noticeType}
                className="message-notice"
                css={noticeStyle(1, 'teal')}
              >
                {notice && notice[noticeType]}
                秒で回答
                <br />
                最速記録更新
              </span>
            );
            break;

          case 'c_update_streak':
            return (
              <span
                key={noticeType}
                className="message-notice"
                css={noticeStyle(1.2, 'tea')}
              >
                {notice && notice[noticeType]}連勝中
              </span>
            );
            break;

          case 'd_update_max_streak':
            return (
              notice &&
              notice.d_update_max_streak &&
              notice.d_update_max_streak !== 1 && (
                <span
                  key={noticeType}
                  className="message-notice"
                  css={noticeStyle(1.4, 'orange')}
                >
                  連勝記録更新
                </span>
              )
            );
            break;

          default:
            return true;
            break;
        }
      })}
    </>
  );
};

export default MessageScores;
