import * as React from 'react';

import { IChat } from '@typings/dbTypes';

import { Chip } from '@mui/material';

type propsType = {
  data: IChat;
  onClick: () => void;
  onDelete: () => void;
};

export default function UserChat({ data, onClick, onDelete }: propsType) {
  const { message, sender } = data;
  const { nickname } = sender;

  const label = `${nickname}님: ${message}`;
  return (
    <Chip
      label={label}
      onClick={onClick}
      onDelete={onDelete}
      sx={{
        width: '100%',
      }}
    />
  );
}
