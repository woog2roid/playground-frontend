import * as React from 'react';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';

import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../style';
import { Alert } from '@mui/material';

export default function ServerError() {
  const navigate = useNavigate();

  const { error: serverError } = useSWR(`/`, fetcher, {
    refreshInterval: 5000,
  });

  React.useEffect(() => {
    if (!serverError) {
      navigate('/');
    }
  }, [serverError]);

  return (
    <>
      <Wrapper>
        <Alert severity="error">
          서버와의 통신이 원활하지 않습니다.
          <br />
          잠시 후에 다시 시도 해주십시오.
          <br />
          일시적인 오류일 수도 있으나 계속해서 이 창이 뜨신다면 관리자에게 문의하십시오.
          <br />
          서버 점검 시간은 매일 오전 4시 입니다.
        </Alert>
      </Wrapper>
    </>
  );
}
