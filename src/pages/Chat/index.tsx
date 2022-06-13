import * as React from 'react';

import { useParams } from 'react-router-dom';
import useSocket from '@hooks/useSocket';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import axios from '@utils/axios';
import { IUser, IChatRoom } from '@typings/dbTypes';
import useSWRChatRooms from '@hooks/useSWRChatRooms';

import produce from 'immer';

import ChatRoomList from '@components/Chat/ChatRoomList';

import { Divider } from '@mui/material';
import ChatComponenetWrapper from '../../pages/Chat/style';

import MainLayout from '@layouts/MainLayout';
import ChatBox from '@components/Chat/ChatBox';

export default function ChatInbox() {
  const { id: chatRoomId } = useParams();
  const { data: userData } = useSWR<IUser>(`/user/me`, fetcher);

  const { chatRoomsData, mutateChatRoomsData, postLastReadTimestamp } =
    useSWRChatRooms();

  const [socket, disconnectSocket] = useSocket('chat');

  React.useEffect(() => {
    const socketData = { userId: userData?.id, chatRoomId: chatRoomId };
    if (chatRoomId !== undefined) {
      socket?.emit('join', socketData);
      postLastReadTimestamp();
    }

    return () => {
      socket?.emit('leave', socketData);
      postLastReadTimestamp();
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
          <div className="chat-box">
            {chatRoomId === undefined ? <></> : <ChatBox />}
          </div>
        </ChatComponenetWrapper>
      </MainLayout>
    </>
  );
}
