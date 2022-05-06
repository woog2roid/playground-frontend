import * as React from 'react';

import ChatRoomList from '@components/Chat/ChatRoomList';

import MainLayout from '@layouts/MainLayout';

import { Divider } from '@mui/material';
import Wrapper from './style';

type propsType = {
  children: React.ReactNode;
};

export default function ChatInbox({ children }: propsType) {
  return (
    <Wrapper>
      <div className="chat-room-list">
        <ChatRoomList />
      </div>
      <Divider orientation="vertical" />
      <div className="chat-box">{children}</div>
    </Wrapper>
  );
}
