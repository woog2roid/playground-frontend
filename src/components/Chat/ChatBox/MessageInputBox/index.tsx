import * as React from 'react';

import axios from '@utils/axios';

import { useParams } from 'react-router-dom';

import { MessageInputBoxWrapper } from './style';
import { Button } from '@mui/material';

export default function MessageInputBox() {
  const { id: chatRoomId } = useParams();

  const onSubmitSendMessage = React.useCallback(
    async (e) => {
      e.preventDefault();
      console.log(e.target.input.value);
      await axios
        .post(`/chat-room/${chatRoomId}/chat`, {
          message: e.target.input.value,
        })
        .catch((error) => {
          console.log(error);
        });
      e.target.input.value = '';
    },
    [chatRoomId],
  );

  return (
    <MessageInputBoxWrapper onSubmit={onSubmitSendMessage}>
      <input name="input" placeholder="메세지 입력..." />
      <Button variant="text" type="submit" sx={{ ml: '5px' }}>
        보내기
      </Button>
    </MessageInputBoxWrapper>
  );
}
