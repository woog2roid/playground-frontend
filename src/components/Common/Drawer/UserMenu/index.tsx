import * as React from 'react';

import useSWR from 'swr';
import axios from 'axios';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@utils/dbTypes';

import { Box, Drawer, List, Divider, ListItem, ListItemText } from '@mui/material';
import { BottomListWrapper } from './style';

type propsType = {
  isOpen: boolean;
  closeDrawer: () => void;
};

export default function UserMenuDrawer({ isOpen, closeDrawer }: propsType) {
  const { data, error, mutate } = useSWR<IUser>(`${process.env.REACT_APP_SERVER}/user/me`, fetcher);

  const onClickLogout = () => {
    //확인 과정

    //로그아웃 과정
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/user/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(() => {
        mutate();
      })
      .catch(() => {
        alert('서버와의 통신이 원활하지 않아요... :(');
      });
  };

  const onClickQuit = () => {
    //확인 과정

    //회원탈퇴 과정
    axios
      .delete(`${process.env.REACT_APP_SERVER}/user/quit`, {
        withCredentials: true,
      })
      .then(() => {
        mutate();
      })
      .catch(() => {
        alert('서버와의 통신이 원활하지 않아요... :(');
      });
  };

  return (
    <React.Fragment>
      <Drawer anchor={'right'} open={isOpen} onClose={closeDrawer}>
        <Box sx={{ width: '250px' }}>
          <List></List>

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
    </React.Fragment>
  );
}
