import * as React from 'react';

import ChatComponent from '@components/Chat';

import MainLayout from '@layouts/MainLayout';

export default function Chat() {
  return (
    <>
      <MainLayout>
        <ChatComponent />
      </MainLayout>
    </>
  );
}
