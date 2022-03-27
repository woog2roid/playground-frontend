import { useEffect } from 'react';
import loadable from '@loadable/component';
import { useNavigate, Route, Routes } from 'react-router-dom';

const Main = loadable(() => import('@pages/Main'));
const DeviceError = loadable(() => import('@pages/DeviceError'));
const NotFound = loadable(() => import('@pages/NotFound'));

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 1200) {
      navigate('./deviceError');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/DeviceError" element={<DeviceError />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
