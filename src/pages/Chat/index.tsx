import * as React from 'react';

import ChatRoomList from '@components/Chat/ChatRoomList';

import { Divider } from '@mui/material';
import ChatComponenetWrapper from '../../pages/Chat/style';

import MainLayout from '@layouts/MainLayout';
import ChatBox from '@components/Chat/ChatBox';
import { useParams } from 'react-router-dom';

export default function ChatInbox() {
  const params = useParams();

  return (
    <>
      <MainLayout>
        <ChatComponenetWrapper>
          <div className="chat-room-list">
            <ChatRoomList />
          </div>
          <Divider orientation="vertical" />
          <div className="chat-box">{params.id === undefined ? <></> : <ChatBox />}</div>
        </ChatComponenetWrapper>
      </MainLayout>
    </>
  );
}
