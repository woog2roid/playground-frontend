import styled from '@emotion/styled';
import Color from '@styles/Color';

export const Wrapper = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
`;

type sideProps = {
  side?: string;
};
export const Div = styled.div<sideProps>`
  display: flex;
  width: 180px;
  justify-content: ${(props) => (props?.side === 'right' ? 'flex-end' : 'flex-start')};
  & > .nav-items {
    display: inline-block;
    padding: 0px 5px 0px 5px;
    margin-top: -7px;
    border-radius: 10%;
    color: ${Color.Blue};
  }

  .nav-items + .nav-items {
    margin-left: 15px;
  }

  & > .hover {
    &: hover {
      background-color: ${Color.Blue};
      color: ${Color.White};
    }
  }
`;
