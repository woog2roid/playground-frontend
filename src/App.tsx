import * as React from 'react';
import loadable from '@loadable/component';
import { useNavigate, Route, Routes } from 'react-router-dom';

const Main = loadable(() => import('@pages/Main'));
const DeviceError = loadable(() => import('@pages/DeviceError'));
const NotFound = loadable(() => import('@pages/NotFound'));
const Test = loadable(() => import('@components/Common/Drawer/MyMenu'));

export default function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.innerWidth < 1200) {
      navigate('./deviceError');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/DeviceError" element={<DeviceError />} />
      <Route path="/test" element={<Test />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
