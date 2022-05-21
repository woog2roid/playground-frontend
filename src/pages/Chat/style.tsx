import styled from '@emotion/styled';
import Color from '@styles/Color';

const Wrapper = styled.div`
  display: flex;
  height: 100%;

  & > .chat-room-list {
    width: 25%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  & > .chat-box {
    width: 75%;
  }
`;

export default Wrapper;
