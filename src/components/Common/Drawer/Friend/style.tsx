import styled from '@emotion/styled';
import Color from '@styles/Color';

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

export const BottomListWrapper = styled.div``;
