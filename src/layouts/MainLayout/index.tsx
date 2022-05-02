import * as React from 'react';

import TopNav from '@components/Common/Navigation/TopNav';
import BottomNav from '@components/Common/Navigation/BottomNav';

import Wrapper from './style';

type propsType = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: propsType) {
  return (
    <>
      <Wrapper>
        <div className="top-nav">
          <TopNav />
        </div>
        <div className="contents">{children}</div>
        <div className="bottom-nav">
          <BottomNav />
        </div>
      </Wrapper>
    </>
  );
}
