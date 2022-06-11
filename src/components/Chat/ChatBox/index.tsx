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
import NewChatAlert from './NewChatAlert';

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
  }, [chatRoomId]);

  //new message float alert
  const [uncheckedChat, setUncheckedChat] = React.useState<IChat>();
  const handleNewChatAlertClick = () => {
    handleNewChatAlertDelete();
    scrollToBottom();
  };
  const handleNewChatAlertDelete = () => {
    setUncheckedChat(undefined);
  };

  React.useEffect(() => {
    setUncheckedChat(undefined);
  }, [chatRoomId]);

  //socket
  const [socket] = useSocket('chat');

  const onMessage = React.useCallback(
    (socketChat: IChat) => {
      console.log('웹 소켓 메세지 도착', socketChat);
      mutateChatData((previousChatData) => {
        //socket 데이터 바탕으로 local에서 직접 업데이트
        const updatedChatData = produce(
          previousChatData,
          (previousChatData) => {
            previousChatData?.[0].push(socketChat);
          },
        );
        return updatedChatData;
      }, false).then(() => {
        //그 후에 채팅창 UX 조절 (스크롤 or 토스트)
        if (chatBoxScroll && chatBoxScroll.current) {
          console.log(
            chatBoxScroll.current.scrollTop,
            chatBoxScroll.current.scrollHeight,
          );
          if (
            //아직 채팅창이 한장을 안넘어가거나
            chatBoxScroll.current.scrollHeight < 800 ||
            //이미 충분히 밑이거나
            chatBoxScroll.current.scrollTop >
              chatBoxScroll.current.scrollHeight - 800 ||
            //본인이 보낸 메세지이면
            socketChat.sender.id === userData?.id
          ) {
            scrollToBottom();
          } else {
            setUncheckedChat(socketChat);
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

  //uswSWRInfinte 에서 온 data를 후가공함.
  const sortChatDataByDate = (chats: IChat[]) => {
    console.log('sortChatDataByDate 함수 실행');
    //데이터에 날자를 기준으로
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
  };

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
        {uncheckedChat !== undefined ? (
          <div className="new-chat">
            <NewChatAlert
              data={uncheckedChat}
              onClick={handleNewChatAlertClick}
              onDelete={handleNewChatAlertDelete}
            />
          </div>
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
