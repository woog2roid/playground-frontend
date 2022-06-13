import * as React from 'react';

import { IChatRoom } from '@typings/dbTypes';

import { useNavigate } from 'react-router-dom';

import { Wrapper } from './style';
import { Chip } from '@mui/material';

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
      {data.unreads > 0 ? (
        <Chip label={data.unreads} color="error" variant="outlined" />
      ) : (
        <></>
      )}
    </Wrapper>
  );
}
