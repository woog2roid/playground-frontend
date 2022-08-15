import * as React from 'react';
import loadable from '@loadable/component';

import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@typings/dbTypes';

const Login = loadable(() => import('@pages/Login'));
const Join = loadable(() => import('@pages/Join'));
const Notice = loadable(() => import('@pages/Notice'));
const Chat = loadable(() => import('@pages/Chat'));
const DeviceError = loadable(() => import('@pages/Error/Device'));
const ServerError = loadable(() => import('@pages/Error/Server'));
const NotFound = loadable(() => import('@pages/Error/NotFound'));

export default function App() {
  // 배포 환경에서 console.log 지우기
  if (process.env.NODE_ENV === 'production') {
    console.log = function no_console() {};
  }

  const navigate = useNavigate();
  const { data: userData } = useSWR<IUser>(`/user/me`, fetcher);
  const { error: serverError } = useSWR(`/`, fetcher, {
    refreshInterval: 5000,
  });

  if (window.innerWidth < 1200) {
    return <DeviceError />;
  }
  if (serverError) {
    return <ServerError />;
  }

  const InitPage = userData ? (
    <Navigate to="/notice" replace />
  ) : (
    <Navigate to="/login" replace />
  );

  return (
    <Routes>
      <Route path="*" element={InitPage} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
