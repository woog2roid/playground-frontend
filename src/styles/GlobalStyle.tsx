import { Global, css } from '@emotion/react';
import MinSans from './fonts/MinSans-Medium.ttf';
import BackgroundImage from '@images/bg-illustration.png';

const style = css`
  @font-face {
    font-family: 'MinSans';
    src: local('MinSans'), url(${MinSans}) format('truetype');
  }
  body {
    background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${BackgroundImage});
    margin: 0.5% 1% 0.5% 1%;
    font-family: 'MinSans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
