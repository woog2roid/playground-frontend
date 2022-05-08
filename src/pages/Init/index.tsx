import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@typings/dbTypes';

import MainLayout from '@layouts/MainLayout';

export default function Init() {
  const navigate = useNavigate();
  const { data: userData } = useSWR<IUser>(`/user/me`, fetcher);

  React.useEffect(() => {
    if (userData) {
      navigate('/notice');
    } else {
      navigate('/login');
    }
  }, [userData]);

  return (
    <>
      <MainLayout />
    </>
  );
}
