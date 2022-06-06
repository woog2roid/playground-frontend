import * as React from 'react';

import { useParams } from 'react-router-dom';
import useSocket from '@hooks/useSocket';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@typings/dbTypes';

import ChatRoomList from '@components/Chat/ChatRoomList';

import { Divider } from '@mui/material';
import ChatComponenetWrapper from '../../pages/Chat/style';

import MainLayout from '@layouts/MainLayout';
import ChatBox from '@components/Chat/ChatBox';

export default function ChatInbox() {
  const { id: chatRoomId } = useParams();
  const { data: userData } = useSWR<IUser>(`/user/me`, fetcher);
  const [socket, disconnectSocket] = useSocket('chat');

  React.useEffect(() => {
    const socketData = { userId: userData?.id, chatRoomId: chatRoomId };
    if (chatRoomId !== undefined) {
      console.log('채팅방 입장', socketData);
      socket?.emit('join', socketData);
    }
    return () => {
      console.log('채팅방 나가기', socketData);
      socket?.emit('leave', socketData);
    };
  }, [chatRoomId]);

  return (
    <>
      <MainLayout>
        <ChatComponenetWrapper>
          <div className="chat-room-list">
            <ChatRoomList />
          </div>
          <Divider orientation="vertical" />
          <div className="chat-box">{chatRoomId === undefined ? <></> : <ChatBox />}</div>
        </ChatComponenetWrapper>
      </MainLayout>
    </>
  );
}
