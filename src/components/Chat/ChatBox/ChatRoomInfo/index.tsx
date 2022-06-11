import * as React from 'react';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IChatRoom, IUser } from '@typings/dbTypes';
import axios from '@utils/axios';

import ChatRoomMembersModal from './ChatRoomMembersModal';
import { InfoOutlined } from '@mui/icons-material';
import { Wrapper } from './style';

import { useParams } from 'react-router-dom';

export default function ChatRoomInfo() {
  const { id: chatRoomId } = useParams();
  const { data: chatRoomsData, mutate: mutateChatRoomsData } = useSWR<IChatRoom[]>(`/chat-room`, fetcher);
  const [chatRoomMembers, setChatRoomMembers] = React.useState<IUser[] | undefined>();
  const [chatRoomData, setChatRoomData] = React.useState<IChatRoom | undefined>();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  React.useEffect(() => {
    const getChatRoomMembers = () => {
      axios
        .get<IUser[]>(`/chat-room/${chatRoomId}/member`)
        .then((res) => {
          setChatRoomMembers(res.data);
          console.log(chatRoomMembers);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getChatRoomData = () => {
      const chatRoomData = chatRoomsData?.find((data) => {
        if (chatRoomId !== undefined) {
          return data.id === +chatRoomId;
        }
      });
      setChatRoomData(chatRoomData);
    };

    getChatRoomMembers();
    getChatRoomData();
  }, [chatRoomId]);

  return (
    <Wrapper>
      <span>{chatRoomData !== undefined ? chatRoomData.title : ' '}</span>
      <InfoOutlined onClick={openModal} fontSize="small" />

      <ChatRoomMembersModal isOpen={isModalOpen} handleClose={closeModal} chatRoomMembers={chatRoomMembers} />
    </Wrapper>
  );
}
