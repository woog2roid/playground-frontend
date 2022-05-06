import * as React from 'react';
import loadable from '@loadable/component';

import { useNavigate, Route, Routes } from 'react-router-dom';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';

const Main = loadable(() => import('@pages/Main'));
const ChatInbox = loadable(() => import('@pages/Chat/Inbox'));
const ChatRoom = loadable(() => import('@pages/Chat/Room'));
const DeviceError = loadable(() => import('@pages/Error/Device'));
const ServerError = loadable(() => import('@pages/Error/Server'));
const NotFound = loadable(() => import('@pages/Error/NotFound'));

export default function App() {
  const { error: serverError } = useSWR(`/`, fetcher, {
    refreshInterval: 5000,
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.innerWidth < 1200) {
      return navigate('/error/device');
    }
    if (serverError) {
      return navigate('/error/server');
    }
    navigate('/');
  }, [serverError]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chat/inbox" element={<ChatInbox />} />
      <Route path="/chat/room/:id" element={<ChatRoom />} />
      <Route path="/error/device" element={<DeviceError />} />
      <Route path="/error/server" element={<ServerError />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
