import styled from '@emotion/styled';
import { Button, List } from '@mui/material';

export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: 630,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export const CustomStyledButton = styled(Button)`
  float: right;
`;

export const CustomStyledList = styled(List)`
  max-height: 500px;
  overflow-y: auto;
`;
