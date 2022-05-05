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

  & > .content-wrapper {
    position: fixed;
    top: 10%;
    height: calc(80% - 60px);
    left: 8%;
    width: calc(84% - 60px);

    border-radius: 5%;
    padding: 30px;

    background: ${Color.TransparentBlue};
  }

  .content-wrapper > .content {
    background-color: ${Color.TransparentWhite};
    width: 100%;
    height: 100%;
  }
`;

export default Wrapper;
