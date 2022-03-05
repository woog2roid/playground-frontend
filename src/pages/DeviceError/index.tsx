import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceErrorComponent from '@components/DeviceError';

function DeviceError() {
  const navigate = useNavigate();
  useEffect(() => {
    const size = {
      width: window.innerWidth,
    };

    if (size.width >= 1200) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <DeviceErrorComponent />
    </>
  );
}

export default DeviceError;
