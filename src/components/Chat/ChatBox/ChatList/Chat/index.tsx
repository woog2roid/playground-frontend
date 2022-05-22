import * as React from 'react';

import dayjs from 'dayjs';
import { IChat } from '@typings/dbTypes';

import { Wrapper } from './style';

type propsType = {
  data: IChat;
  isMyMessage: boolean;
  showsSender: boolean;
};

export default function Chat({ data, isMyMessage, showsSender }: propsType) {
  const { message, createdAt } = data;
  const { id: senderId, nickname: senderNickname } = data.sender;

  return (
    <Wrapper isMyMessage={isMyMessage}>
      {showsSender ? <div className="sender">{senderNickname}님</div> : <></>}
      <div className="content">
        <span className="message">{message}</span>
        <span className="timestamp">{dayjs(createdAt).format('h:mm A')}</span>
      </div>
    </Wrapper>
  );
}
