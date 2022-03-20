import { useState } from 'react';

import TopNav from '@components/Common/Navigation/TopNav';
import BottomNav from '@components/Common/Navigation/BottomNav';
import LoginModal from '@components/Main/LoginModal';
import JoinModal from '@components/Main/JoinModal';

function Main() {
  const [isLoginModalOpen, setLoginModalState] = useState(true);
  const handleLoginModalOpen = () => setLoginModalState(true);
  const handleLoginModalClose = () => setLoginModalState(false);

  const [isJoinModalOpen, setJoinModalState] = useState(false);
  const handleJoinModalOpen = () => setJoinModalState(true);
  const handleJoinModalClose = () => setJoinModalState(false);

  return (
    <>
      <TopNav />
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        handleLoginModalOpen={handleLoginModalOpen}
        handleLoginModalClose={handleLoginModalClose}
        handleJoinModalOpen={handleJoinModalOpen}
      />
      <JoinModal
        isJoinModalOpen={isJoinModalOpen}
        handleJoinModalOpen={handleJoinModalOpen}
        handleJoinModalClose={handleJoinModalClose}
        handleLoginModalOpen={handleLoginModalOpen}
      />

      <BottomNav />
    </>
  );
}

export default Main;
