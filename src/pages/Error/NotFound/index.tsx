import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../style';
import { Alert, Button } from '@mui/material';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Alert severity="error">404에러! URL을 확인해주세요 :(</Alert>
    </Wrapper>
  );
}
