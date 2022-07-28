import { FC } from 'react';

import Message, { MessageType } from 'components/molecules/message';

const Chat: FC<{
  messages: MessageType[];
}> = ({ messages }) => {
  console.log(messages);

  return (
    <div className="chat">
      {messages.map((message: MessageType) => (
        <Message message={message} />
      ))}
    </div>
  );
};

export default Chat;
