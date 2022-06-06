import * as React from 'react';
import useSocket from '@hooks/useSocket';

import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import fetcher from '@utils/swrFetcehr';
import { IChat, IUser } from '@typings/dbTypes';
import axios from '@utils/axios';

import produce from 'immer';

import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import ChatList from './ChatList';
import ChatRoomInfo from './ChatRoomInfo';
import MessageInputBox from './MessageInputBox';

import { Divider } from '@mui/material';
import { ChatBoxLayout } from './style';

export default function ChatBox() {
  //get Chat Data from server
  const { id: chatRoomId } = useParams();
  const { data: userData } = useSWR<IUser>(`/user/me`, fetcher);
  const { data: chatData, mutate: mutateChatData } = useSWRInfinite<IChat[]>(
    (index) => `/chat-room/${chatRoomId}/chat/?page=${index + 1}`,
    fetcher,
    {
      onSuccess() {
        setTimeout(() => {
          //채팅 로딩...
          scrollToBottom();
        }, 100);
      },
    },
  );

  //scroll
  const chatBoxScroll = React.useRef<HTMLInputElement>(null);
  const scrollToBottom = React.useCallback(() => {
    if (chatBoxScroll && chatBoxScroll.current) {
      chatBoxScroll.current.scrollTop = chatBoxScroll.current.scrollHeight;
    }
  }, []);

  //socket
  const [socket, disconnectSocket] = useSocket('chat');

  const onMessage = React.useCallback(
    (chat: IChat) => {
      console.log('웹 소켓 메세지 도착', chat);
      mutateChatData((chatData) => {
        //socket 데이터 바탕으로 local에서 직접 업데이트
        const updatedChatData = produce(chatData, (chatData) => {
          chatData?.[0].push(chat);
        });
        return updatedChatData;
      }, false).then(() => {
        //그 후에 채팅창 UX 조절 (스크롤 or 토스트)
        if (chatBoxScroll && chatBoxScroll.current) {
          if (
            //이미 충분히 밑이거나
            chatBoxScroll.current.scrollTop >
              chatBoxScroll.current.scrollHeight - 800 ||
            //본인이 보낸 메세지이면
            chat.sender.id === userData?.id
          ) {
            scrollToBottom();
          }
        }
      });
    },
    [mutateChatData],
  );

  React.useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message');
    };
  }, [socket, mutateChatData]);

  const chatsByDate =
    chatData !== undefined
      ? sortChatDataByDate(([] as IChat[]).concat(...chatData))
      : undefined;

  return (
    <ChatBoxLayout>
      <div className="chat-room-info">
        <ChatRoomInfo />
      </div>
      <Divider />
      <div className="chat-room" ref={chatBoxScroll}>
        {chatsByDate !== undefined ? (
          <ChatList chatsByDate={chatsByDate} />
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

function sortChatDataByDate(chats: IChat[]) {
  console.log('sortChatDataByDate 함수 실행');
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
