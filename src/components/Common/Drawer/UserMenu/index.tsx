import * as React from 'react';

import axios from '@utils/axios';

import { useNavigate } from 'react-router-dom';

import confirm from '@utils/confirm';
import { Box, Drawer, List, Divider, ListItem } from '@mui/material';
import { BottomListWrapper } from './style';

type propsType = {
  isOpen: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
};

export default function UserMenuDrawer({ isOpen, closeDrawer, openDrawer }: propsType) {
  const navigate = useNavigate();

  const onClickLogout = async () => {
    closeDrawer();
    const isConfirmed = await confirm('로그아웃 하시겠습니까?');
    if (isConfirmed) {
      axios
        .post(`${process.env.REACT_APP_SERVER}/user/logout`)
        .then(() => {
          navigate(0);
        })
        .catch(() => {
          alert('서버와의 통신이 원활하지 않아요... :(');
        });
    } else {
      openDrawer();
    }
  };

  const onClickQuit = async () => {
    closeDrawer();
    const isConfirmed = await confirm('정말 탈퇴하시겠습니까?');
    if (isConfirmed) {
      axios
        .delete(`${process.env.REACT_APP_SERVER}/user/quit`, {
          withCredentials: true,
        })
        .then(() => {
          navigate(0);
        })
        .catch(() => {
          alert('서버와의 통신이 원활하지 않아요... :(');
        });
    } else {
      openDrawer();
    }
  };

  return (
    <Drawer anchor={'right'} open={isOpen} onClose={closeDrawer}>
      <Box sx={{ width: '250px' }}>
        <BottomListWrapper>
          <Divider />
          <List>
            <ListItem button onClick={onClickLogout}>
              로그아웃
            </ListItem>
            <ListItem button onClick={onClickQuit}>
              회원탈퇴
            </ListItem>
          </List>
        </BottomListWrapper>
      </Box>
    </Drawer>
  );
}
