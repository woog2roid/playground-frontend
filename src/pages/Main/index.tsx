import * as React from 'react';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@utils/dbTypes';

import { useNavigate } from 'react-router-dom';

import TopNav from '@components/Common/Navigation/TopNav';
import BottomNav from '@components/Common/Navigation/BottomNav';
import LoginModal from '@components/Main/LoginModal';
import JoinModal from '@components/Main/JoinModal';

import Wrapper from '@styles/layouts/MainLayout';

export default function Main() {
  const navigate = useNavigate();
  const { data: userData, error: userDataError } = useSWR<IUser>(`/user/me`, fetcher);

  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (userData) {
      setIsLoginModalOpen(false);
    }
  }, [userData]);

  return (
    <>
      <Wrapper>
        <div className="top-nav">
          <TopNav />
        </div>
        <div className="contents">ㅎㅇㅎㅇ</div>
        <div className="bottom-nav">
          <BottomNav />
        </div>
      </Wrapper>

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
