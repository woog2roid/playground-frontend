import * as React from 'react';
import loadable from '@loadable/component';
import { useNavigate, Route, Routes } from 'react-router-dom';

const Main = loadable(() => import('@pages/Main'));
const DeviceError = loadable(() => import('@pages/DeviceError'));
const NotFound = loadable(() => import('@pages/NotFound'));

export default function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.innerWidth < 1200) {
      return navigate('./deviceError');
    }
    if (navigator.userAgent.toLowerCase().indexOf('chrome') === -1) {
      alert('이 웹앱은 크로미움 환경에서 잘 작동합니다 :D');
    }
    navigate('/');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/DeviceError" element={<DeviceError />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
