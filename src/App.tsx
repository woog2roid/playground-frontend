import { useEffect } from 'react';
import loadable from '@loadable/component';
import { useNavigate, Route, Routes } from 'react-router-dom';

//const Main = loadable(() => import('@pages/Main'));
//const LogIn = loadable(() => import('@pages/LogIn'));
const DeviceError = loadable(() => import('@pages/DeviceError'));

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const size = {
      width: window.innerWidth,
    };

    if (size.width < 1200) {
      navigate('./deviceError');
    }
  }, []);

  return (
    <Routes>
      <Route path="/DeviceError" element={<DeviceError />} />
    </Routes>
  );
}

export default App;

//      <Route path="/" element={<Main />} />
