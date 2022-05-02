import styled from '@emotion/styled';
import Color from '@styles/Color';

/*좌우로 1%씩, 위 아래로 5px씩 여유두고 레이아웃 짠다.*/
const Wrapper = styled.div`
  padding: 0;
  margin-left: 1%;
  margin-right: 1%;
  width: 98%;
  height: 100%;

  & > .top-nav {
    position: fixed;
    top: 5px;
    height: 70px;
    width: inherit;
  }

  & > .bottom-nav {
    position: fixed;
    bottom: 5px;
    height: 50px;
    width: inherit;
  }

  & > .contents {
    position: fixed;
    top: 10%;
    height: 80%;
    left: 8%;
    width: 84%;
    background-color: ${Color.TransparentBlue};
  }
`;

export default Wrapper;
