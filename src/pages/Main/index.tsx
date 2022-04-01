import * as React from 'react';
import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@utils/dbTypes';

import TopNav from '@components/Common/Navigation/TopNav';
import BottomNav from '@components/Common/Navigation/BottomNav';
import LoginModal from '@components/Main/LoginModal';
import JoinModal from '@components/Main/JoinModal';

import Wrapper from '@styles/layouts/MainLayout';

export default function Main() {
  const { data: userData, error } = useSWR<IUser>(`${process.env.REACT_APP_SERVER}/user/me`, fetcher);

  const [isLoginModalOpen, setLoginModalState] = React.useState(false);
  const [isJoinModalOpen, setJoinModalState] = React.useState(false);

  React.useEffect(() => {
    //console.log('리렌더링이 얼마나 되는지 확인');
    if ((!userData?.id || error) && !isJoinModalOpen) {
      //로그인이 안되어 있고, 회원가입 중이 아닌경우에만 로그인 모달을 오픈한다.
      setLoginModalState(true);
    } else if (userData) {
      setLoginModalState(false);
    }
  }, [userData, error, isJoinModalOpen]);

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
        handleLoginModalClose={() => setLoginModalState(false)}
        handleJoinModalOpen={() => setJoinModalState(true)}
      />
      <JoinModal
        isJoinModalOpen={isJoinModalOpen}
        handleJoinModalClose={() => setJoinModalState(false)}
        handleLoginModalOpen={() => setLoginModalState(true)}
      />
    </>
  );
}
