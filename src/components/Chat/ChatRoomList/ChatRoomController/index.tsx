import * as React from 'react';

import { MarkChatReadOutlined, AddBoxOutlined } from '@mui/icons-material';

import GenerateChatRoomModal from './GenerateChatRoomModal';
import { Wrapper } from './style';

export default function ChatRoomController() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onClickReadAll = () => {
    console.log('안 읽은 채팅 모두 읽기');
  };

  const onClickGenerateChatRoom = () => {
    openModal();
  };

  return (
    <>
      <Wrapper>
        <span className="icons" onClick={onClickReadAll}>
          <MarkChatReadOutlined />
        </span>
        <span className="icons" onClick={onClickGenerateChatRoom}>
          <AddBoxOutlined />
        </span>
      </Wrapper>

      <GenerateChatRoomModal isOpen={isModalOpen} handleClose={closeModal} />
    </>
  );
}
