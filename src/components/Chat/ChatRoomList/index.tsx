import * as React from 'react';

import useSWRChatRooms from '@hooks/useSWRChatRooms';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IChatRoom } from '@typings/dbTypes';
import axios from '@utils/axios';

import ChatRoomList from './ChatRoomListItem';
import ChatRoomController from './ChatRoomController';

import { Divider, List, ListItem } from '@mui/material';

export default function Chat() {
  const { chatRoomsData, mutateChatRoomsData, postLastReadTimestamp } =
    useSWRChatRooms();

  return (
    <>
      <ChatRoomController />
      <Divider />
      <List sx={{ padding: 0, margin: 0 }}>
        {chatRoomsData?.map((data: IChatRoom) => {
          return (
            <ListItem key={+data.id} button>
              <ChatRoomList data={data} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
