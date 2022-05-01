import * as React from 'react';

import useSWR from 'swr';
import { IFriends, IUser } from '@utils/dbTypes';
import fetcher from '@utils/swrFetcehr';
import axios from '@utils/axios';

import { List, Popover } from '@mui/material';
import { Check, ClearOutlined } from '@mui/icons-material';
import { ListItemWrapper, PopoverItem } from './style';

type PropsType = {
  id: string;
  nickname: string;
};

export const RequestedFriendListItem = ({ id: followerId, nickname: followerNickname }: PropsType) => {
  const { mutate } = useSWR<IFriends>(`/friend`, fetcher);
  const { data: userData } = useSWR<IUser>('/user/me', fetcher);

  const onClickAcceptRequest = () => {
    axios.post(`/friend/accept/${followerId}`).then(() => {
      mutate();
      axios.post(`/chat-room?dm=true`, {
        members: [followerId, userData?.id],
        title: '',
      });
    });
  };

  const onClickRejectRequest = () => {
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
        <Check onClick={onClickAcceptRequest} fontSize="small" />
        <ClearOutlined onClick={onClickRejectRequest} fontSize="small" />
      </span>
    </ListItemWrapper>
  );
};

export const NotAcceptedFriendListItem = ({ id: followingId, nickname: followingNickname }: PropsType) => {
  const { mutate } = useSWR<IFriends>(`/friend`, fetcher);

  const onClickCancelRequest = () => {
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
        <ClearOutlined onClick={onClickCancelRequest} fontSize="small" />
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
  const closeMenuPopover = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const onContextMenu = React.useCallback((e) => {
    e.preventDefault();
    handleClick(e);
  }, []);

  const onClickChat = () => {};

  const onClickRemoveFriend = () => {
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
        onClose={closeMenuPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          <PopoverItem onClick={onClickChat}>채팅하기</PopoverItem>
          <PopoverItem onClick={onClickRemoveFriend}>친구삭제</PopoverItem>
        </List>
      </Popover>
    </>
  );
};
