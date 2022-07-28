import { FC } from 'react';

export type MessageTypes = 'answer' | 'hint' | 'start' | 'score';
export type MessageType = {
  id: number;
  name: string;
  type: MessageTypes;
  value?: string;
  matched?: boolean;
};

const Chat: FC<{
  message: MessageType;
}> = ({ message }) => (
  <p key={message.id}>
    {message.name}
    <br />
    {message.value ?? ''}
  </p>
);

export default Chat;
