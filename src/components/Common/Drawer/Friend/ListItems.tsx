import * as React from 'react';

import useSWR from 'swr';
import { IFriends } from '@utils/dbTypes';
import fetcher from '@utils/swrFetcehr';
import axios from '@utils/axios';

import { List, ListItem, Popover } from '@mui/material';
import { Check, ClearOutlined, ChatBubble, PersonRemove } from '@mui/icons-material';
import { ListItemWrapper, PopoverListItem } from './style';

type PropsType = {
  id: string;
  nickname: string;
};

export const RequestedFriendListItem = ({ id: followerId, nickname: followerNickname }: PropsType) => {
  const { mutate } = useSWR<IFriends>(`/friend`, fetcher);

  const acceptFriendRequest = () => {
    axios
      .post('/friend/accept', {
        id: followerId,
      })
      .then(() => {
        mutate();
      });
  };

  const rejectFriendRequest = () => {
    axios.delete(`/friend/request?relation=follower&id=${followerId}`).then(() => {
      mutate();
    });
  };

  return (
    <ListItemWrapper>
      <span>
        {followerNickname}({followerId})님
      </span>
      <span>
        <Check onClick={acceptFriendRequest} fontSize="small" />
        <ClearOutlined onClick={rejectFriendRequest} fontSize="small" />
      </span>
    </ListItemWrapper>
  );
};

export const NotAcceptedFriendListItem = ({ id: followingId, nickname: followingNickname }: PropsType) => {
  const { mutate } = useSWR<IFriends>(`/friend`, fetcher);

  const cancelFriendRequest = () => {
    axios.delete(`/friend/request?relation=following&id=${followingId}`).then(() => {
      mutate();
    });
  };

  return (
    <ListItemWrapper>
      <span>
        {followingNickname}({followingId})님
      </span>
      <span>
        <ClearOutlined onClick={cancelFriendRequest} fontSize="small" />
      </span>
    </ListItemWrapper>
  );
};

export const FriendListItem = ({ id: followingId, nickname: followingNickname }: PropsType) => {
  const { mutate } = useSWR<IFriends>(`/friend`, fetcher);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const onContextMenu = React.useCallback((e) => {
    e.preventDefault();
    handleClick(e);
  }, []);

  const removeFriend = () => {
    axios.delete(`/friend?id=${followingId}`).then(() => {
      mutate();
    });
  };

  return (
    <>
      <ListItemWrapper onContextMenu={onContextMenu}>
        <span>
          {followingNickname}({followingId})님
        </span>
      </ListItemWrapper>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          <PopoverListItem>채팅하기</PopoverListItem>
          <PopoverListItem onClick={removeFriend}>친구삭제</PopoverListItem>
        </List>
      </Popover>
    </>
  );
};
