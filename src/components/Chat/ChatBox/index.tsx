import * as React from 'react';

import useSWRInfinite from 'swr/infinite';
import fetcher from '@utils/swrFetcehr';
import { IChat } from '@typings/dbTypes';
import axios from '@utils/axios';

import { useParams } from 'react-router-dom';

import Message from './Message';
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

  return (
    <ChatBoxLayout>
      <div className="chat-room-info">
        <ChatRoomInfo />
      </div>
      <Divider />
      <div className="chat-room">
        {chatData !== undefined ? (
          ([] as IChat[])
            .concat(...chatData)
            .reverse()
            .map((data) => {
              console.log('테스트', data);
              return <Message key={data.id} data={data} />;
            })
        ) : (
          <></>
        )}
      </div>
      <div className="message-input">
        <MessageInputBox />
      </div>
    </ChatBoxLayout>
  );
}
