import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceErrorComponent from '@components/DeviceError';

export default function DeviceError() {
  const navigate = useNavigate();
  React.useEffect(() => {
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
