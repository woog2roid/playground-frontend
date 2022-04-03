import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from '@styles/GlobalStyle';
//mui component들을 편하게 이용하기 위해 기본 mui theme 적용하였음
import { createTheme, ThemeProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider
        theme={createTheme({
          typography: {
            fontFamily: `MinSans`,
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
          },
        })}
      >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
