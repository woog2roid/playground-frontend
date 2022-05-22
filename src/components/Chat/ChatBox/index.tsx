import * as React from 'react';

import useSWRInfinite from 'swr/infinite';
import fetcher from '@utils/swrFetcehr';
import { IChat } from '@typings/dbTypes';
import axios from '@utils/axios';

import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import ChatList from './ChatList';
import ChatRoomInfo from './ChatRoomInfo';
import MessageInputBox from './MessageInputBox';

import { Divider } from '@mui/material';
import { ChatBoxLayout } from './style';

export default function ChatBox() {
  const { id: chatRoomId } = useParams();
  const { data: chatData, mutate: mutateChatData } = useSWRInfinite<IChat[]>(
    (index) => `/chat-room/${chatRoomId}/chat/?page=${index + 1}`,
    fetcher,
  );

  const chatsByDate = chatData !== undefined ? sortChatDataByDate(([] as IChat[]).concat(...chatData)) : undefined;

  return (
    <ChatBoxLayout>
      <div className="chat-room-info">
        <ChatRoomInfo />
      </div>
      <Divider />
      <div className="chat-room">{chatsByDate !== undefined ? <ChatList chatsByDate={chatsByDate} /> : <></>}</div>
      <div className="message-input">
        <MessageInputBox />
      </div>
    </ChatBoxLayout>
  );
}

function sortChatDataByDate(chats: IChat[]) {
  const chatsByDate: { [key: string]: IChat[] } = {};

  chats.forEach((chat) => {
    const date = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if (chatsByDate[date] === undefined) {
      chatsByDate[date] = [chat];
    } else {
      chatsByDate[date].push(chat);
    }
  });

  return chatsByDate;
}
