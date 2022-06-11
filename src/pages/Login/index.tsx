import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@typings/dbTypes';

import LoginModal from '@components/Login/LoginModal';

import MainLayout from '@layouts/MainLayout';

export default function Login() {
  const navigate = useNavigate();
  const { data: userData } = useSWR<IUser>(`/user/me`, fetcher);

  React.useEffect(() => {
    if (userData) {
      navigate('/notice');
    }
  }, [userData]);

  return (
    <>
      <MainLayout />
      <LoginModal />
    </>
  );
}
