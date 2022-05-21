import styled from '@emotion/styled';
import Color from '@styles/Color';

export const MessageInputBoxWrapper = styled.form`
  width: 90%;
  margin: 0 auto;
  padding: 5px;
  text-align: center;

  border: 1px solid ${Color.Gray};
  border-radius: 20px;

  & > input {
    background-color: transparent;

    width: calc(90% - 30px);
    height: 40px;

    font-family: MinSans;
    font-size: 15px;

    border: none;
    &: focus {
      outline: none;
    }
  }
`;
