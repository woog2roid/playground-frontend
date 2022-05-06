import * as React from 'react';

import MainLayout from '@layouts/MainLayout';
import ChatComponentLayout from '@layouts/ChatComponentLayout';

export default function ChatRoom() {
  return (
    <>
      <MainLayout>
        <ChatComponentLayout>id에 따른 실제 채팅방 ㅇㅇ</ChatComponentLayout>
      </MainLayout>
    </>
  );
}
