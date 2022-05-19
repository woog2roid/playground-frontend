import { Modal, Box, Typography } from '@mui/material';
import { modalStyle } from './style';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@typings/dbTypes';

type propsType = {
  isOpen: boolean;
  handleClose: () => void;
  chatRoomMembers: IUser[] | undefined;
};

export default function ChatRoomMemberModal({ isOpen, handleClose, chatRoomMembers }: propsType) {
  const { data: userData } = useSWR<IUser>(`/user/me`, fetcher);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalStyle}>
        {chatRoomMembers?.map((member) => {
          if (member.id === userData?.id) return;
          return (
            <div key={member.id}>
              {member.nickname}({member.id})님
            </div>
          );
        })}
      </Box>
    </Modal>
  );
}
