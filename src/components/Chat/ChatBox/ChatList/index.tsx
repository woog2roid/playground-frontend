import * as React from 'react';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser, IChat } from '@typings/dbTypes';

import dayjs from 'dayjs';

import { Divider, Chip } from '@mui/material';
import Chat from './Chat';

type propsType = {
  chatsByDate: { [key: string]: IChat[] };
};

export default function ChatList({ chatsByDate }: propsType) {
  const { data: userData } = useSWR<IUser>(`/user/me`, fetcher);

  React.useEffect(() => {
    console.log('챗리스트 컴포넌트 테스트', Object.entries(chatsByDate));
  });

  return (
    <>
      {Object.entries(chatsByDate).map(([date, chats]) => {
        return (
          <div key={date}>
            <Divider>
              <Chip label={date} />
            </Divider>
            {chats.map((chat, index) => {
              if (chat.sender.id === userData?.id) {
                return <Chat key={chat.id} data={chat} showsSender={false} isMyMessage={true} />;
              }
              if (index === 0) {
                return <Chat key={chat.id} data={chat} showsSender={true} isMyMessage={false} />;
              } else {
                return (
                  <Chat
                    key={chat.id}
                    data={chat}
                    showsSender={
                      chats[index - 1].sender.id !== chat.sender.id ||
                      dayjs(chats[index - 1].createdAt).format('YYYY-MM-DD HH:mm') !==
                        dayjs(chat.createdAt).format('YYYY-MM-DD HH:mm')
                    }
                    isMyMessage={false}
                  />
                );
              }
            })}
          </div>
        );
      })}
    </>
  );
}
