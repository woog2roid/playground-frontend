import * as React from 'react';

import axios from '@utils/axios';
import { IUser } from '@utils/dbTypes';

import { Box, Button, Popover } from '@mui/material';

type propsType = {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  userData: IUser | null;
  errorCode: String | null;
};

export default function FriendPopover({ isOpen, anchorEl, onClose, userData, errorCode }: propsType) {
  const errorMessage = errorCode == '404' ? '아이디를 확인해주세요 :(' : '서버와의 통신이 원활하지 않네요 :(';
  const ErrorMessage = () => {
    return <Box sx={{ padding: 1 }}>{errorMessage}</Box>;
  };

  const onClickFriendAdd = React.useCallback(
    (e) => {
      e.preventDefault();
      axios.post('/friend/request', {
        id: userData?.id,
      });
    },
    [userData],
  );

  const PopOverContent = () => {
    return (
      <Box sx={{ padding: 1.5 }}>
        <span>
          {userData?.nickname}({userData?.id})님에게
        </span>
        <Button onClick={onClickFriendAdd} variant="text" sx={{ fontSize: '16px' }}>
          <span>친구 요청 보내기</span>
        </Button>
      </Box>
    );
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {errorCode ? ErrorMessage() : PopOverContent()}
    </Popover>
  );
}
