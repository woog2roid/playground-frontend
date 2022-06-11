import { Global, css } from '@emotion/react';
import MinSans from './fonts/MinSans-Medium.ttf';
import BackgroundImage from '@images/bg-illustration.png';

const style = css`
  @font-face {
    font-family: 'MinSans';
    src: local('MinSans'), url(${MinSans}) format('truetype');
  }

  body {
    padding: 0;
    margin: 0;

    background-image: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url(${BackgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;

    font-family: 'MinSans';

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
