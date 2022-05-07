import * as React from 'react';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IFriends, IUserRelation } from '@typings/dbTypes';

import { Box, List, Drawer, ListItem } from '@mui/material';
import { RequestedFriendListItem, NotAcceptedFriendListItem, FriendListItem } from './ListItemsByRelation';
import { Summary, Details, BottomListWrapper } from './style';

type propsType = {
  isOpen: boolean;
  closeDrawer: () => void;
};

export default function FriendDrawer({ isOpen, closeDrawer }: propsType) {
  const { data } = useSWR<IFriends>(`/friend`, fetcher);

  return (
    <Drawer anchor={'right'} open={isOpen} onClose={closeDrawer}>
      <Box sx={{ width: '300px' }}>
        <Details>
          <Summary>{`친구 목록  (${data?.friends?.length})`}</Summary>
          <List>
            {data?.friends?.map((data: IUserRelation) => {
              return (
                <ListItem button key={+data.id}>
                  <FriendListItem id={data.following.id} nickname={data.following.nickname} />
                </ListItem>
              );
            })}
          </List>
        </Details>
        <BottomListWrapper>
          <Details>
            <Summary>{`아직 확인하지 않은 친구 요청  (${data?.followers?.length})`}</Summary>
            <List>
              {data?.followers?.map((data: IUserRelation) => {
                return (
                  <ListItem button key={+data.id}>
                    <RequestedFriendListItem id={data.follower.id} nickname={data.follower.nickname} />
                  </ListItem>
                );
              })}
            </List>
          </Details>
          <Details>
            <Summary>{`아직 수락되지 않은 친구 요청  (${data?.followings?.length})`}</Summary>
            <List>
              {data?.followings?.map((data: IUserRelation) => {
                return (
                  <ListItem button key={+data.id}>
                    <NotAcceptedFriendListItem id={data.following.id} nickname={data.following.nickname} />
                  </ListItem>
                );
              })}
            </List>
          </Details>
        </BottomListWrapper>
      </Box>
    </Drawer>
  );
}
