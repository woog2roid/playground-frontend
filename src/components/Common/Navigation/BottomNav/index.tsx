import * as React from 'react';
import { Wrapper, Div } from './style';
import { Home, People, Menu } from '@mui/icons-material';

import Footer from './GithubFooter';
import UserMenuDrawer from '@components/Common/Drawer/UserMenu';

export default function BottomNav() {
  const [isUserMenuDrawerOpen, setIsUserMenuDrawerOpen] = React.useState(false);
  const closeUserMenuDrawer = () => {
    setIsUserMenuDrawerOpen(false);
  };
  const opneUserMenuDrawer = () => {
    setIsUserMenuDrawerOpen(true);
  };

  return (
    <>
      <Wrapper>
        <Div>
          <Home fontSize="large" className="nav-items hover" />
        </Div>
        <Div>
          <Footer />
        </Div>
        <Div side="right">
          <People fontSize="large" className="nav-items hover" />
          <Menu fontSize="large" className="nav-items hover" onClick={opneUserMenuDrawer} />
        </Div>
      </Wrapper>

      <UserMenuDrawer isOpen={isUserMenuDrawerOpen} closeDrawer={closeUserMenuDrawer} />
    </>
  );
}
