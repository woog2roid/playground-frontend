import * as React from 'react';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@utils/dbTypes';

import TopNav from '@components/Common/Navigation/TopNav';
import BottomNav from '@components/Common/Navigation/BottomNav';
import LoginModal from '@components/Main/LoginModal';
import JoinModal from '@components/Main/JoinModal';

export default function Main() {
  const { data: userData, error } = useSWR<IUser>(`${process.env.REACT_APP_SERVER}/user/me`, fetcher);

  const [isLoginModalOpen, setLoginModalState] = React.useState(false);
  const [isJoinModalOpen, setJoinModalState] = React.useState(false);

  React.useEffect(() => {
    console.log('리렌더링이 얼마나 되는지 확인');
    if (userData) {
      setLoginModalState(false);
    } else if (error) {
      setLoginModalState(true);
    }
  }, [userData, error]);

  return (
    <>
      <TopNav />
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        handleLoginModalClose={() => setLoginModalState(false)}
        handleJoinModalOpen={() => setJoinModalState(true)}
      />
      <JoinModal
        isJoinModalOpen={isJoinModalOpen}
        handleJoinModalClose={() => setJoinModalState(false)}
        handleLoginModalOpen={() => setLoginModalState(true)}
      />

      <BottomNav />
    </>
  );
}
