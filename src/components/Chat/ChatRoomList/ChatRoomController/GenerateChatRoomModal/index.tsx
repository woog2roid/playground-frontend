import * as React from 'react';

import { Modal, Box, Button, Checkbox, Divider, List, ListItem, OutlinedInput } from '@mui/material';
import { modalStyle, CustomStyledButton, CustomStyledList } from './style';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import axios from '@utils/axios';
import { IFriends, IUserRelation, IChatRoom, IUser } from '@typings/dbTypes';

type propsType = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function GenerateChatRoomModal({ isOpen, handleClose }: propsType) {
  const { data: friendsData } = useSWR<IFriends>(`/friend`, fetcher);
  const { data: chatRoomsData, mutate: mutateChatRoomData } = useSWR<IChatRoom[]>(`/chat-room`, fetcher);
  const { data: userData, mutate: mutateUserData } = useSWR<IUser>(`/user/me`, fetcher);

  const [checkedUsers, setCheckedUsers] = React.useState<string[]>([]);
  const handleUserToggle = (id: string) => () => {
    const currentIndex = checkedUsers.indexOf(id);
    const newCheckedUsers = [...checkedUsers];

    if (currentIndex === -1) {
      newCheckedUsers.push(id);
    } else {
      newCheckedUsers.splice(currentIndex, 1);
    }

    setCheckedUsers(newCheckedUsers);
  };

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      if (checkedUsers.length === 0) {
        return alert('채팅방멤버를 체크해주세요.');
      }
      if (checkedUsers.length === 1) {
        return alert('그룹채팅방 만들기 입니다. 일대일 채팅은 자동생성 된 채팅방을 이용해주세요.');
      }

      handleClose();
      if (userData !== undefined) {
        const chatRoomMembers = [...checkedUsers];
        chatRoomMembers.push(userData.id);
        const chatRoomTitle = e.target.chatRoomTitle.value;
        console.log('채팅방 유저들', chatRoomMembers, '채팅방 이름', e.target.chatRoomTitle.value);

        axios
          .post(`/chat-room?dm=false`, {
            members: chatRoomMembers,
            title: chatRoomTitle,
          })
          .then((res) => {
            mutateChatRoomData();
            e.target.chatRoomTitle.value = '';
            setCheckedUsers([]);
          });
      }
    },
    [checkedUsers],
  );

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box component="form" sx={modalStyle} onSubmit={onSubmit}>
        <OutlinedInput name="chatRoomTitle" placeholder="채팅방 이름" size="small" fullWidth required />
        <Divider sx={{ mt: 1, mb: 1 }} />
        <CustomStyledList>
          {friendsData?.friends?.map((friendsData: IUserRelation) => {
            return (
              <ListItem
                key={+friendsData.id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleUserToggle(friendsData.following.id)}
                    checked={checkedUsers.indexOf(friendsData.following.id) !== -1}
                  />
                }
              >
                <span>
                  {friendsData.following.nickname}({friendsData.following.id})님
                </span>
              </ListItem>
            );
          })}
        </CustomStyledList>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <CustomStyledButton type="submit" variant="contained">
          채팅방 만들기
        </CustomStyledButton>
      </Box>
    </Modal>
  );
}
