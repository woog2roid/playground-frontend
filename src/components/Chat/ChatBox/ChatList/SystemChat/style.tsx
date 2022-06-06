import styled from '@emotion/styled';
import Color from '@styles/Color';

export const Wrapper = styled.div`
  text-align: center;
  margin: 8px 0px;

  & > .sender {
    font-size: 13px;
    margin: 2px;
  }

  & > .content {
    display: flex;
    justify-content: center;
    align-items: center;

    & > .message {
      max-width: 800px;
      word-break: break-all;
      text-align: left;

      border-radius: 6px;
      padding: 3px 6px;
      background-color: ${Color.TransparentGray};

      font-size: 16px;
    }
  }
`;
