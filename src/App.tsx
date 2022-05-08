import * as React from 'react';
import loadable from '@loadable/component';

import { useNavigate, useLocation, Route, Routes, Navigate } from 'react-router-dom';

import useSWR from 'swr';
import fetcher from '@utils/swrFetcehr';

const Init = loadable(() => import('@pages/Init'));
const Login = loadable(() => import('@pages/Login'));
const Join = loadable(() => import('@pages/Join'));
const Notice = loadable(() => import('@pages/Notice'));
const Chat = loadable(() => import('@pages/Chat'));
const DeviceError = loadable(() => import('@pages/Error/Device'));
const ServerError = loadable(() => import('@pages/Error/Server'));
const NotFound = loadable(() => import('@pages/Error/NotFound'));

export default function App() {
  const navigate = useNavigate();
  const { error: serverError } = useSWR(`/`, fetcher, {
    refreshInterval: 5000,
  });

  React.useEffect(() => {
    if (window.innerWidth < 1200) {
      return navigate('/error/device');
    }
    if (serverError) {
      return navigate('/error/server');
    }
    navigate('/');
  }, [serverError]);

  /*
    useEffect에서 에러 페이지를 처리하고,
    동시에 모든 첫 접속을 root url로 리다이렉트 시킨다.

    root url에서는 로그인이 되어있는지 확인하고
    /login, /notice로 리다이렉트 시킨다.

    로그인이 되어있는 페이지 중에서는 /notice가 메인페이지의 역할을 수행한다.
    (notice에서는 공지사항, 사용법 등이 게시판 형태로 업데이트 됨.)
  */
  return (
    <Routes>
      <Route path="/" element={<Init />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/error/device" element={<DeviceError />} />
      <Route path="/error/server" element={<ServerError />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
