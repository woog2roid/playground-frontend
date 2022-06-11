import * as React from 'react';

import useSWR from 'swr';
import axios from '@utils/axios';
import fetcher from '@utils/swrFetcehr';
import { IUser, IFriends } from '@typings/dbTypes';

import { Box, Button, Popover } from '@mui/material';

type propsType = {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  userData: IUser | null;
  errorCode: String | null;
};

export default function FriendPopover({ isOpen, anchorEl, onClose, userData, errorCode }: propsType) {
  const { mutate } = useSWR<IFriends>(`/friend`, fetcher);

  const errorMessage = errorCode == '404' ? '아이디를 확인해주세요 :(' : '서버와의 통신이 원활하지 않습니다.';
  const ErrorMessage = () => {
    return <Box sx={{ padding: 1 }}>{errorMessage}</Box>;
  };

  const onClickFriendAdd = React.useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(`/friend/request/${userData?.id}`)
        .then(() => {
          mutate();
          onClose();
        })
        .catch((error) => {
          onClose();
          alert(`${error.response.data.message}`);
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
