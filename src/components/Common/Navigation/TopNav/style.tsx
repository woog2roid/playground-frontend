import styled from '@emotion/styled';
import { styled as mstyled } from '@mui/material/styles';
import Color from '@styles/Color';
import { InputBase } from '@mui/material';

export const Wrapper = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
`;

export const Div = styled.div`
  & > .topnav-items {
    display: inline-block;
    height: 50px;
    padding: 0 5px 0 5px;
    margin: 0 15px 0 15px;
    border-radius: 10%;

    text-decoration: none;
    line-height: 50px;
    color: ${Color.TransparentBlue};
    font-size: 25px;
    font-weight: 700;
  }

  & > .welcome-text {
    font-size: 18px;
    font-weight: 600;
  }

  & > .hover {
    &: hover {
      background-color: ${Color.TransparentBlue};
      color: ${Color.TransparentWhite};
    }
  }
`;

export const SearchWrapper = mstyled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: Color.TransparentWhite,
  marginLeft: 0,
  width: '100%',
}));

export const SearchIconWrapper = mstyled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = mstyled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
