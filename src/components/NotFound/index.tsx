import { useNavigate } from 'react-router-dom';
import { Wrapper } from './style';
import { Alert, Button } from '@mui/material';

export default function DeviceError() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Alert severity="error">404에러! URL을 확인해주세요 :(</Alert>
      <Button onClick={goBack} fullWidth variant="contained" color="error">
        이전 페이지로 가기
      </Button>
    </Wrapper>
  );
}
