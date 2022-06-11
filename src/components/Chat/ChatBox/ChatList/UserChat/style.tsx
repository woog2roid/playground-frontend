import styled from '@emotion/styled';
import Color from '@styles/Color';

type wrapperProps = {
  isMyMessage: boolean;
};
export const Wrapper = styled.div<wrapperProps>`
  text-align: ${(props) => (props.isMyMessage ? 'right' : 'left')};
  margin: 8px 0px;

  & > .sender {
    font-size: 13px;
    margin: 2px;
  }

  & > .content {
    display: flex;
    flex-direction: ${(props) => (props.isMyMessage ? 'row-reverse' : 'row')};
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

    & > .timestamp {
      margin: 0px 5px;
      font-size: 8px;
    }
  }
`;
