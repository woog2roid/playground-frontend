import styled from '@emotion/styled';
import Color from '@styles/Color';

export const Wrapper = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
`;

export const Div = styled.div`
  width: 150px;

  & > .nav-items {
    display: inline-block;
    padding: 5px 5px 5px 5px;
    margin: -7px 15px 0 15px;
    border-radius: 10%;
    color: ${Color.TransparentBlue};
  }

  & > .hover {
    &: hover {
      background-color: ${Color.TransparentBlue};
      color: ${Color.TransparentWhite};
    }
  }
`;
