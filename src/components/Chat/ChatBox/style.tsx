import styled from '@emotion/styled';

export const ChatBoxLayout = styled.div`
  height: 100%;

  & > .chat-room-info {
    height: 55px;
  }

  & > .chat-room {
    height: calc(100% - 55px - 70px);
    padding: 0px 20px 0px 20px;

    overflow-y: auto;
    overflow-x: hidden;
  }

  & > .message-input {
    padding: 5px;
    height: 60px;
  }
`;
