import * as React from 'react';

import useSWR from 'swr';
import { IFriends, IUser } from '@typings/dbTypes';
import fetcher from '@utils/swrFetcehr';
import axios from '@utils/axios';

import { List, Popover } from '@mui/material';
import { Check, ClearOutlined, PersonRemove } from '@mui/icons-material';
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

  const onClickRemoveFriend = () => {
    axios.delete(`/friend?id=${followingId}`).then(() => {
      mutate();
    });
  };

  return (
    <>
      <ListItemWrapper>
        <span>
          {followingNickname}({followingId})님
        </span>
        <span>
          <PersonRemove onClick={onClickRemoveFriend} fontSize="small" />
        </span>
      </ListItemWrapper>
    </>
  );
};
