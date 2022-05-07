import * as React from 'react';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@typings/dbTypes';

import LoginModal from '@components/Main/LoginModal';
import JoinModal from '@components/Main/JoinModal';

import MainLayout from '@layouts/MainLayout';

export default function Main() {
  const { data: userData } = useSWR<IUser>(`/user/me`, fetcher);

  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (userData) {
      setIsLoginModalOpen(false);
    }
  }, [userData]);

  return (
    <>
      <MainLayout>ㅎㅇㅎㅇ</MainLayout>

      {/*모달은 아랫 부분에 위치하도록*/}
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        closeLoginModal={() => setIsLoginModalOpen(false)}
        openJoinModal={() => setIsJoinModalOpen(true)}
      />
      <JoinModal
        isJoinModalOpen={isJoinModalOpen}
        closeJoinModal={() => setIsJoinModalOpen(false)}
        openLoginModal={() => setIsLoginModalOpen(true)}
      />
    </>
  );
}
