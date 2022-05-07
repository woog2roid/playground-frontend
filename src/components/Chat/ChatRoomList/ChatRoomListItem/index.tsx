import * as React from 'react';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IChatRoom } from '@utils/dbTypes';
import axios from '@utils/axios';

import { useNavigate } from 'react-router-dom';

import { Wrapper } from './style';

type propsType = {
  data: IChatRoom;
};

export default function ChatRoomListItem({ data }: propsType) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/chat/${data.id}`);
  };

  return (
    <Wrapper onClick={onClick}>
      <span>{data.title}</span>
    </Wrapper>
  );
}
