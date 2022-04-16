import styled from '@emotion/styled';
import Color from '@styles/Color';
import { ListItem } from '@mui/material';

export const ListItemWrapper = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

export const Details = styled.details`
  border: 8px solid white;
`;

export const Summary = styled.summary`
  background-color: ${Color.TransparentBlue};
  padding: 12px;
  font-size: 16px;
  &::marker {
    font-size: 0;
  }
`;

export const BottomListWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const PopoverListItem = styled(ListItem)`
  font-size: 13px;
`;
