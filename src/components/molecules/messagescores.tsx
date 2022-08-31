import MessageNotice from 'components/atoms/messagenotice';
import { MessageNoticeObj } from 'utils/types';
import { FC } from 'react';

const MessageScores: FC<{
  notice: MessageNoticeObj;
}> = ({ notice }) => (
  <>
    {Object.keys(notice).map((noticeType) => {
      switch (noticeType) {
        case 'a_score':
          return (
            <MessageNotice
              key={noticeType}
              animationDelay={0.8}
              background="palepink"
            >
              スコア +{notice && notice[noticeType]}
            </MessageNotice>
          );
          break;

        case 'b_update_fastest':
          return (
            <MessageNotice
              key={noticeType}
              animationDelay={1}
              background="teal"
            >
              {notice && notice[noticeType]}
              秒で回答
              <br />
              最速記録更新
            </MessageNotice>
          );
          break;

        case 'c_update_streak':
          return (
            <MessageNotice
              key={noticeType}
              animationDelay={1.2}
              background="tea"
            >
              {notice && notice[noticeType]}連勝中
            </MessageNotice>
          );
          break;

        case 'd_update_max_streak':
          return (
            notice &&
            notice.d_update_max_streak &&
            notice.d_update_max_streak !== 1 && (
              <MessageNotice
                key={noticeType}
                animationDelay={1.4}
                background="orange"
              >
                連勝記録更新
              </MessageNotice>
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

export default MessageScores;
