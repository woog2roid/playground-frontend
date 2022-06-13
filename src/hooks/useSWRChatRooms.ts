import * as React from 'react';

import { useParams } from 'react-router-dom';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IChatRoom } from '@typings/dbTypes';
import axios from '@utils/axios';

import { produce } from 'immer';

const useSWRChatRooms = () => {
  const { id: chatRoomId } = useParams();

  const mutateUnreadsLocally = React.useCallback(() => {
    mutateChatRoomsData((chatRoomsData) => {
      const updatedChatRoomsData = produce(chatRoomsData, (chatRoomsData) => {
        chatRoomsData?.map((chatRoom) => {
          if (chatRoomId && chatRoom.id === +chatRoomId) {
            chatRoom.unreads = 0;
          }
          return chatRoom;
        });
      });
      return updatedChatRoomsData;
    }, false);
  }, [chatRoomId]);

  const { data: chatRoomsData, mutate: mutateChatRoomsData } = useSWR<
    IChatRoom[]
  >(`/chat-room`, fetcher, {
    onSuccess() {
      console.log('onSuccess 함수 정상 작동 중');
      if (chatRoomId) {
        mutateUnreadsLocally();
      }
    },
  });

  const postLastReadTimestamp = () => {
    if (chatRoomId !== undefined) {
      axios.post(`/chat-room/${chatRoomId}/last-read`).then(() => {
        mutateUnreadsLocally();
      });
    }
  };

  return { chatRoomsData, mutateChatRoomsData, postLastReadTimestamp };
};

export default useSWRChatRooms;
