import * as React from 'react';

import { MarkChatReadOutlined, AddBoxOutlined } from '@mui/icons-material';

import { Wrapper } from './style';

export default function ChatRoomController() {
  const onClickReadAll = () => {
    console.log('안 읽은 채팅 모두 읽기');
  };

  const onClickAddChat = () => {
    console.log('새로운 채팅방 만들기');
  };

  return (
    <Wrapper>
      <span className="icons" onClick={onClickReadAll}>
        <MarkChatReadOutlined />
      </span>
      <span className="icons" onClick={onClickAddChat}>
        <AddBoxOutlined />
      </span>
    </Wrapper>
  );
}
