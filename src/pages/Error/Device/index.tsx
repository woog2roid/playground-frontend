import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../style';
import { Alert, Button } from '@mui/material';

export default function DeviceError() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const size = {
      width: window.innerWidth,
    };

    if (size.width >= 1200) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Wrapper>
        <Alert severity="error">놀이터 서비스는 서비스 특성상 데스크탑 환경만을 지원해요:(</Alert>
        <Button onClick={() => navigate(-1)} fullWidth variant="contained" color="error">
          이전 페이지로 가기
        </Button>
      </Wrapper>
    </>
  );
}
