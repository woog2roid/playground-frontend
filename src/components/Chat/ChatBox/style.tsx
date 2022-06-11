import styled from '@emotion/styled';

export const ChatBoxLayout = styled.div`
  height: 100%;

  & > .chat-room-info {
    height: 55px;
  }

  & > .chat-room {
    position: relative;

    height: calc(100% - 10px - 55px - 70px);
    padding: 5px 20px 5px 20px;

    overflow-y: auto;
    overflow-x: hidden;

    & > .new-chat {
      position: sticky;
      bottom: 20px;
    }
  }

  & > .message-input {
    padding: 5px;
    height: 60px;
  }
`;
